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
           
           
          }else{
            alert("No account found")
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
  
  
  