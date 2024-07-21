const sessionID = {
  ID: getCookie("sessionID")
}



window.addEventListener('load', () => {
  console.log(sessionID)
  fetch("/getEmail", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(sessionID),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (confirm(`We will send a OTP on your registered email, ${data} for verification. Do you want to proceed?`)) {

        let Email = {
          id: data
        }
        fetch("/sendOTP", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Email),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data == true) {
              document.getElementById("loaddiv").style.display = "none"
              document.getElementById("otp-container").style.display = "flex"
              document.getElementById("otp-submit").addEventListener('click', () => {
                if (document.getElementById("otp").value !== '') {
                  const otp = document.getElementById("otp").value
                  // console.log(otp)

                  document.getElementById("otp-container").style.display = "none"
                  document.getElementById("password-container").style.display = "flex"
                  document.getElementById("submit").addEventListener('click', () => {
                    const EnteredData = {
                      ID: getCookie("sessionID"),
                      OTP: otp,
                      NewPassword: document.getElementById("new-password").value
                    }
                    fetch("/resetPassword", {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify(EnteredData),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data)
                        if (data.acknowledged == true && data.modifiedCount == 1) {
                          alert("Password updatation sucessfull")
                          document.getElementById("loaddiv").style.display = "none"
                          window.close();
                        } else {
                          alert("Wrong OTP, try again!")
                          window.location.reload();
                        }

                      })
                  })
                }
              })
            }

          })
      } else {
        window.close();
      }
    })
})



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