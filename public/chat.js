
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
        chat.className = "chat";
        chat.innerHTML = element;
        chatsContainer.appendChild(chat);
        console.log('Created chat element:', chat);

        chat.addEventListener('click', () => {
          console.log('Chat element clicked:', chat);
             
      let name={
        Name: chat.innerHTML
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



 document.querySelector('.more-icon').addEventListener('click',()=>{

 if(document.getElementById('dropdown-content').style.display =='grid') {

  document.getElementById('dropdown-content').style.display='none'
  document.getElementById('more').style.display='grid'
  document.getElementById('cross-icon').style.display='none'

 }else{
  document.getElementById('dropdown-content').style.display='grid'
  document.getElementById('more').style.display='none'
  document.getElementById('cross-icon').style.display='flex'
 }



 })

document.getElementById('logOutBtn').addEventListener('click',()=>{

  if(confirm("Are you sure to log out from your current account")){

    localStorage.removeItem("user")
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.assign("index.html");

  }
  
})


