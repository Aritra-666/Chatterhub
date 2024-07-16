document.getElementById("submit").addEventListener("click", () => {
  const Username = document.getElementById("username").value;
  const Password = document.getElementById("password").value;
  if (Username == "" || Password == 0) {
    alert("Enter all correct details");
  } else {
    const UserDetails = {
      name: Username,
      password: Password,
    };
    console.log(UserDetails);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(UserDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          console.log(data.Email);
      
          
          setCookie('user', document.getElementById("username").value , 1);
          
            localStorage.setItem("user", data.Name);
            window.location.assign("chat.html");
         
         
        }
      });
  }
});



function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + (days* 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}



// window.addEventListener("scroll", () => {
//   if(window.scrollY <= 100){
//     window.scrollBy({
//       top: 1500,
//       left: 0,
//       behavior: 'smooth' // This will animate the scroll
//     });
//   }
// })
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function runAfterDelay() {
  console.log('Wait for 1 seconds...');
  await delay(1000);
  if(document.documentElement.clientWidth >= 1024){
    
    document.getElementById("chatterhub").style.left="25%"
    document.getElementById("chatterhub").classList.add("enter")
    document.getElementById("back").style.display="flex"
    document.getElementById("back").classList.add("widhtincrese")
    await delay(1000);
    document.querySelector(".login-container").classList.add("login-laptop")
    document.querySelector(".login-container").style.display= "inline"
  }else if(document.documentElement.clientWidth <= 1024){
      await delay(2800);
    document.getElementById("chatterhub").style.display="none"
    document.getElementById("back").style.display="flex"
    document.getElementById("back").classList.add("widhtincrese")
    await delay(1000);
     document.querySelector(".login-container").style.display= "inline"
     
  }
}


window.addEventListener("load", () => {
  
  if(document.documentElement.clientWidth > 1700){
    if(! alert("Your device isn't suitable for Chatterhub")){
      console.log("click")
      window.close("index.html")
    }
  }
  
  function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  // Usage
  let username = getCookie("user");
  console.log(username);

  if (username !== null) {
    localStorage.setItem("user", username);
    window.location.assign("chat.html");
  }

  runAfterDelay();
});
