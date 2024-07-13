



const startButton = document.getElementById('start');

const chatsContainer = document.getElementById('chats');
const box = document.querySelector('.box');


window.addEventListener("load", () => {
  box.style.display = 'inline-block';
  console.log('Start button clicked:', startButton);

  let user = { Name: localStorage.getItem("user") };
  if (!user.Name) {
    console.error('User name not found in localStorage.');
    return;
  }

  console.log('User:', user);

  fetch("/loadchats", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
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
        let chatIMG=document.createElement("img");
        let chatname=document.createElement("div");
        let name={
          Name:element
        }
        chat.className = "chat";
        chatname.innerHTML = element;
        chatIMG.className="chatimg"
        chatname.className="chatname"
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
          chatIMG.src=data
         
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

      box.style.display = 'inline-block';

    })
    .catch((error) => {
      console.error('Error fetching chats:', error);
    });

});



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

    localStorage.removeItem("user")
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign("index.html");

  }

})

document.getElementById('profile').addEventListener('click', () => {
  document.querySelectorAll(".chat").forEach((element)=>{
    element.style.filter="blur(25px)"
  })
  document.getElementById("logo").style.filter="blur(25px)"
  document.getElementById("dropdown-content").style.filter="blur(25px)"
  document.getElementById("profilecard").style.display = "flex"
  document.getElementById("username").innerHTML = localStorage.getItem('user')
  const profiledata={Name:localStorage.getItem('user')}
  fetch("/profileImage", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(profiledata),
  })
    .then((response) => response.json())
    .then((data) => { document.getElementById("profileimage").src = data})
  

})
document.getElementById('cross2-icon').addEventListener('click', () => {
  document.getElementById("profilecard").style.display = "none"
    document.getElementById("logo").style.filter="blur(0px)"
  document.getElementById("dropdown-content").style.filter="blur(0px)"
})






document.getElementById('file').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {

      profiledata = {
        Name:localStorage.getItem('user'),
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
        .then((data) => { })
    };
    reader.readAsDataURL(file);

  }
});


