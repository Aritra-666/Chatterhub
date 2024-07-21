session = {
  ID: getCookie("sessionID")
}

window.addEventListener('load', () => {
  document.getElementById("loaddiv").style.display = "inline"
  document.getElementById("main").style.display = "none"
  fetch("/sessionCount", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(session),

  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("loaddiv").style.display = "none"
      document.getElementById("main").style.display = "inline"
      document.getElementById("sessioCount").innerHTML = `Active session count : ${data.Length}`
    })
})
document.getElementById("Terminate").addEventListener('click', () => {

  if (confirm("are you sure to terminate all sessions?")) {

    document.getElementById("loaddiv").style.display = "inline"
    document.getElementById("main").style.display = "none"

    fetch("/getUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(session),

    })
      .then((response) => response.json())
      .then((data) => {
        const Username = {
          Name: data.value
        }
        fetch("/terminate", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Username),

        })
          .then((response) => response.json())
          .then((data) => {
            document.getElementById("loaddiv").style.display = "none"
            document.getElementById("main").style.display = "inline"
            console.log(data)
            alert("Termination sucessfull")
            window.location.assign("index.html")
          })


      })
  }

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

document.getElementById("changePassword").addEventListener('click', () => {
  window.open("changePassword.html", "_blank")
})