// const Email=document.getElementById("email");
// const submit=document.getElementById("submit");
// const username=document.getElementById("username");
// const password=document.getElementById("password");
// let EmailName='';
// let Username='';
// let Password=0;

document.getElementById("submit").addEventListener("click", () => {
  const EmailName = document.getElementById("email").value;
  const Username = document.getElementById("username").value;
  const Password = document.getElementById("password").value;
  const length=Username.length;
  console.log(length)

  if (EmailName == "" || Username == "" || Password == 0) {
    alert("Enter all correct details");
  }else if( length > 10){
     alert("Username can contain maximum 10 letters")
  } else {
    document.getElementById("sign").innerHTML = "Wait....";
    document.getElementById("sign").classList.add("flick");
    const UserDetails = {
      email: EmailName,
      name: Username,
      password: Password,
    };
    console.log(UserDetails);
    fetch("/data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(UserDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.code)
        if(data.code !== undefined){
           
          if(data.code == 'EENVELOPE'){
            alert("Please enter a valid Email");
            document.getElementById("sign").innerHTML = "Submit";
            document.getElementById("sign").classList.remove("flick");            
            document.getElementById("email").value = "";
          }else if(data.code == 'EDNS'){
            alert("Please connect your device to internet");
            document.getElementById("sign").innerHTML = "Submit";
            document.getElementById("sign").classList.remove("flick");            
          }

        }
        else if(data.code == undefined){

          if (data) {
            console.log("username available");
            
            document.getElementById("signin-container").style.display = "none";
            document.getElementById("otp-container").style.display = "block";
          } 
          else if(!data) {
            document.getElementById("sign").innerHTML = "Submit";
            document.getElementById("sign").classList.remove("flick");
            alert("username taken");
            
            document.getElementById("username").value = "";
          }
        }
      });

   
  }
});

document.getElementById("otp-submit").addEventListener("click", () => {
  let currentdate=new Date();
  let EnteredOTP = {
    otp: document.getElementById("otp").value,
    email: document.getElementById("email").value,
    name: document.getElementById("username").value,
    password: document.getElementById("password").value,
    date: currentdate
  };
  console.log(EnteredOTP);
  fetch("/dataCheck", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(EnteredOTP),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      if (data.message == "true") {
        localStorage.setItem('user', document.getElementById("username").value )
        window.location.assign('chat.html')
      } else if (data.message == "false") {
        alert("Wrong OTP try again");
        document.getElementById("otp").value = "";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
