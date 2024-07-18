document.getElementById("search-button").addEventListener("click", () => {
    document.getElementById("resultimg").style.display="none"
    document.getElementById("search-button").innerHTML="wait..."
    document.getElementById("search-button").classList.add("flick")
  const username = document.getElementById("search-input").value;
  console.log(username);

  let session = {
    ID: getCookie("sessionID")
  }

  console.log(session)
  fetch("/getUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(session),

  })
    .then((response) => response.json())
    .then((data) => {
      if (username == "") {
        alert("Enter valid username");
        document.getElementById("search-button").classList.remove("flick");
        document.getElementById("search-button").innerHTML="search";
      }
      else if(username == data.value){
        document.getElementById("search-button").classList.remove("flick");
        document.getElementById("search-button").innerHTML="search";
        document.getElementById("result").style.display='flex'
        document.getElementById("resultname").innerHTML = "No user found";
      } 
      else {
        const name = {
          name: username,
        };
        console.log(name);
        fetch("/search", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(name),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            document.getElementById("search-button").classList.remove("flick");
            document.getElementById("search-button").innerHTML="search";
            if(data !== null){
              document.getElementById("result").style.display='flex'
              document.getElementById("resultname").innerHTML = data.Name;
              document.getElementById("resultimg").style.display="flex"
              document.getElementById("resultimg").src=data.ProfileImage;
            }else{
              document.getElementById("result").style.display='flex'
              document.getElementById("resultname").innerHTML = "No user found";
            }
          });
      }
    });
    document.getElementById("result").addEventListener('click',()=>{
       
        if(document.getElementById("resultname").innerHTML !==  "No user found"){
          console.log("pressed")  
          let name={
            Name:document.getElementById("resultname").innerHTML
          }
    
          fetch("/message", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(name),
          })
            .then((response) => response.json())
            .then((data) => {
             console.log(data)
             window.location.assign(data.url)
            });
    
    
    
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