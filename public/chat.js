

const startButton = document.getElementById('start');

const chatsContainer = document.getElementById('chats');
const box = document.querySelector('.box');


getUser();




function getUser() {
  let session = {
    ID: getCookie("sessionID")
  }
  let Username;
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
      




      document.getElementById('file').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
      
            profiledata = {
              Name: data.value,
              base64URL: e.target.result
            }
            
            console.log('Base64 URL:', e.target.result);
            document.getElementById('profileimage').src = e.target.result;                                          
            
            fetch("/updatePP", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(profiledata),
            })
              .then((response) => response.json())
              .then((data) => { 
              })
          };
          reader.readAsDataURL(file);
      
        }
      });

    





      
      Username = {
        Name:data.value
      }
      console.log(Username)


      fetch("/loadchats", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(Username),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data);
    
          if (!Array.isArray(data)) {
            console.error('Fetched data is not an array:', data);
            return;
          }
    
          data.forEach((element) => {
            let chat = document.createElement("div");
            let chatIMG = document.createElement("img");
            let chatname = document.createElement("div");
            // console.log("enter")
            let name = {
              Name: element
            }
            chat.className = "chat";
            chatname.innerHTML = element;
            chatIMG.className = "chatimg"
            chatname.className = "chatname"
            chatsContainer.appendChild(chat);
            chat.appendChild(chatIMG);
            chat.appendChild(chatname);
    
            fetch("/profileImage", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(name),
            })
              .then((response) => response.json())
              .then((data) => {
                chatIMG.src = data
    
              });
    
    
            console.log('Created chat element:', chat);
    
            chat.addEventListener('click', () => {
              console.log('Chat element clicked:', chat);
    
              let name = {
                Name: chatname.innerHTML
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
            });
          });
          document.getElementById("loaddiv").style.display="none"
          box.style.display = 'inline-block';
    
        })
        .catch((error) => {
          console.error('Error fetching chats:', error);
        });

        document.getElementById("username").innerHTML=data.value
        fetch("/profileImage", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Username),
        })
          .then((response) => response.json())
          .then((data) => { document.getElementById("profileimage").src = data })


    })



    .catch((error) => {
      console.log(error)
    })
    
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



document.querySelector('.more-icon').addEventListener('click', () => {

  if (document.getElementById('dropdown-content').style.display == 'grid') {

    document.getElementById('dropdown-content').style.display = 'none'
    document.getElementById('more').style.display = 'grid'
    document.getElementById('cross-icon').style.display = 'none'

  } else {
    document.getElementById('dropdown-content').style.display = 'grid'
    document.getElementById('more').style.display = 'none'
    document.getElementById('cross-icon').style.display = 'flex'
  }



})

document.getElementById('logOutBtn').addEventListener('click', () => {

  if (confirm("Are you sure to log out from your current account")) {

    
    document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign("index.html");

  }

})

document.getElementById('profile').addEventListener('click', () => {
  document.querySelectorAll(".chat").forEach((element) => {
    element.style.filter = "blur(25px)"
  })
  document.getElementById("logo").style.filter = "blur(25px)"
  document.getElementById("dropdown-content").style.filter = "blur(25px)"
  document.getElementById("profilecard").style.display = "flex"
 
  


})
document.getElementById('cross2-icon').addEventListener('click', () => {
  document.getElementById("profilecard").style.display = "none"
  document.getElementById("logo").style.filter = "blur(0px)"
  document.getElementById("dropdown-content").style.filter = "blur(0px)"
  document.querySelectorAll(".chat").forEach((element) => {
    element.style.filter = "blur(0px)"
  })
})


document.getElementById("edit").addEventListener('click',()=>{
  document.querySelectorAll(".chat").forEach((element) => {
    element.style.filter = "blur(25px)"
  })
  document.getElementById("logo").style.filter = "blur(25px)"
  document.getElementById("dropdown-content").style.filter = "blur(25px)"
  document.getElementById("profilecard").style.display = "flex"
 
  


})
document.getElementById('cross2-icon').addEventListener('click', () => {
  document.getElementById("profilecard").style.display = "none"
  document.getElementById("logo").style.filter = "blur(0px)"
  document.getElementById("dropdown-content").style.filter = "blur(0px)"
  document.querySelectorAll(".chat").forEach((element) => {
    element.style.filter = "blur(0px)"
  })
})






document.getElementById("settings").addEventListener('click',()=>{
  document.getElementById("settingsBlock").style.display="flex"
  document.getElementById("settingsList").style.display="inline"
})

document.getElementById("cross3-icon").addEventListener('click',()=>{
    document.getElementById("settingsBlock").style.display="none"
  document.getElementById("settingsList").style.display="none"
})
document.getElementById("privacy").addEventListener('click',()=>{
  window.location.assign("privacy.html")


})