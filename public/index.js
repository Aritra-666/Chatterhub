




document.getElementById("submit").addEventListener("click", () => {
    document.getElementById("loaddiv").style.display="flex"
  const Username = document.getElementById("username").value;
  const Password = document.getElementById("password").value;
  if (Username == "" || Password == 0) {
    alert("Enter all correct details");
  } else {
    document.getElementById("username").disabled =true;
    document.getElementById("password").disabled =true;
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
          console.log(data.ID)
          setCookie('sessionID', data.ID, 365);

          window.location.assign("chat.html");
        } else {
          alert("account not found")
          document.getElementById("username").disabled =false;
          document.getElementById("password").disabled =false;
            document.getElementById("loaddiv").style.display="none"
        }
      });
  }
});



function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function runAfterDelay() {
  console.log('Wait for 1 seconds...');
  await delay(1000);
  if (document.documentElement.clientWidth >= 1024) {

    document.getElementById("chatterhub").style.left = "25%"
    document.getElementById("chatterhub").classList.add("enter")
    document.getElementById("back").style.display = "flex"
    document.getElementById("back").classList.add("widhtincrese")
    await delay(1000);
    document.querySelector(".login-container").classList.add("login-laptop")
    document.querySelector(".login-container").style.display = "inline"
  } else if (document.documentElement.clientWidth <= 1024) {
    await delay(2800);
    document.getElementById("chatterhub").style.display = "none"
    document.getElementById("back").style.display = "flex"
    document.getElementById("back").classList.add("widhtincrese")
    await delay(1000);
    document.querySelector(".login-container").style.display = "inline"

  }
}


window.addEventListener("load", () => {

  if (document.documentElement.clientWidth > 1700) {
    if (!alert("Your device isn't suitable for Chatterhub")) {
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

  // console.log(getCookie("sessionID"))
  let session = {
    ID: getCookie("sessionID")
  }
  console.log(session);

  if (session.ID !== null) {
    fetch("/CheckSession", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(session),

    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.Status == true) {

          window.location.assign("chat.html");
        } else {
   
          alert("session expired")
          deleteCookie("sessionID")
        }
      });
  } else {

  }

  runAfterDelay();
});

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

document.getElementById("CreateAccount").addEventListener('click', () => {

  GoToSign()

})
async function GoToSign() {

  if (document.documentElement.clientWidth >= 1024) {
    console.log("enter")
    document.getElementById("back").classList.remove("widhtincrese")
    document.getElementById("back").classList.add("widhtdecrese")


    await delay(900);
    document.getElementById("back").style.display = "none"

    await delay(900);
    document.querySelector(".login-container").style.opacity = "0"
    document.getElementById("sign-back").style.display = "flex"
    document.getElementById("chatterhub").style.opacity = "0"
    await delay(1000)
    document.getElementById("chatterhub").classList.remove("background")
    document.getElementById("signin-container").classList.add("login-laptop")
    document.getElementById("signin-container").style.display = "inline"
    document.getElementById("chatterhub").style.opacity = "1"
    document.getElementById("otp-container").classList.add("login-laptop")
  } else if (document.documentElement.clientWidth <= 1024) {
    document.getElementById("back").classList.remove("widhtincrese")
    document.getElementById("back").classList.add("widhtdecrese")
    await delay(900);
    document.getElementById("back").style.display = "none"
    await delay(900);
    document.querySelector(".login-container").style.opacity = "0"
    document.getElementById("sign-back").style.display = "flex"
    await delay(1200);
    document.getElementById("signin-container").style.display = "inline"


  }
}




document.getElementById("Sign-submit").addEventListener("click", () => {
  const EmailName = document.getElementById("email").value;
  const Username = document.getElementById("New-username").value;
  const Password = document.getElementById("New-password").value;
  const length = Username.length;
  console.log(length)
  if (EmailName == "" || Username == "" || Password == 0) {
    alert("Enter all correct details");
  } else if (length > 10) {
    alert("Username can contain maximum 10 letters")
  } else {
       document.getElementById("email").disabled =true;
      document.getElementById("New-username").disabled =true;
       document.getElementById("New-password").disabled =true;
      document.getElementById("loaddiv").style.display="flex"
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
        if (data.code !== undefined) {

          if (data.code == 'EENVELOPE') {
            alert("Please enter a valid Email");
              document.getElementById("loaddiv").style.display="none"
            document.getElementById("sign").innerHTML = "Submit";
            document.getElementById("sign").classList.remove("flick");
            document.getElementById("email").value = "";
            document.getElementById("email").disabled =false;
      document.getElementById("New-username").disabled =false;
       document.getElementById("New-password").disabled =false;
          } else if (data.code == 'EDNS') {
            alert("Please connect your device to internet");
                document.getElementById("loaddiv").style.display="none"
            document.getElementById("sign").innerHTML = "Submit";
            document.getElementById("sign").classList.remove("flick");
            document.getElementById("email").disabled =false;
      document.getElementById("New-username").disabled =false;
       document.getElementById("New-password").disabled =false;
          }

        }
        else if (data.code == undefined) {

          if (data) {
            console.log("username available");
    document.getElementById("loaddiv").style.display="none"
            document.getElementById("signin-container").style.display = "none";
            document.getElementById("otp-container").style.display = "block";
          }
          else if (!data) {
            document.getElementById("sign").innerHTML = "Submit";
            document.getElementById("sign").classList.remove("flick");
            alert("username taken");
                document.getElementById("loaddiv").style.display="none"
                document.getElementById("email").disabled =false;
                document.getElementById("New-username").disabled =false;
                 document.getElementById("New-password").disabled =false;
            document.getElementById("username").value = "";
          }
        }
      });


  }
});

document.getElementById("otp-submit").addEventListener("click", () => {

  let EnteredOTP = {
    otp: document.getElementById("otp").value,
    email: document.getElementById("email").value,
    name: document.getElementById("New-username").value,
    password: document.getElementById("New-password").value,
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
      if (data.ID !== null) {
        console.log(data.ID)
        setCookie('sessionID', data.ID, 365);

        window.location.assign("chat.html");
      } else {
        alert("Wrong OTP try again");
        document.getElementById("otp").value = "";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
