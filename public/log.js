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
          console.log(data.ID)
          setCookie('sessionID', data.ID, 365);

          window.location.assign("chat.html");
        } else {
          alert("account not found")
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

  
  
  

  
  
  