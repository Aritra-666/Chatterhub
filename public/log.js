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
        }
        document.getElementById("loaddiv").style.display="none"
      });
  }
});



function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

  
  
  

  
  
  