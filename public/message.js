window.addEventListener('load',()=>{
  console.log(window.location.search);
  const params= new URLSearchParams(window.location.search);
  const receiver=params.get('messageTo')
  console.log(receiver);
  document.getElementById('receiver-name').innerHTML=receiver;

  let conn={
   
      user1: localStorage.getItem('user'),
      user2: receiver,
     
  }
  fetch("/ChatHistory", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(conn),
  })
    .then((response) => response.json())
    .then((data) => {
      let messages=Array.from(data)
      messages.forEach((element)=>{
      let preMessages= document.createElement('div')
      preMessages.className='message'
      document.getElementById('message-box').appendChild(preMessages)
      preMessages.innerHTML= element.message ;
      if(element.from == localStorage.getItem('user')){
        preMessages.classList.add('sendedMessage')
      }else if(element.to == localStorage.getItem('user')){
        preMessages.classList.add('receivedMessage')
      }
      
    })
 



    })
    let name={
      Name:receiver
    }
    fetch("/profileImage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(name),
    })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("profileimage").src=data
     
    });

})
document.getElementById('send').addEventListener('click',()=>{
  if(document.getElementById('text').value !== ''){
    let message={
      from: localStorage.getItem('user'),
      to:document.getElementById('receiver-name').innerHTML,
      message:document.getElementById('text').value,
      time: new Date(),
    }
    fetch("/sendMessage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
       
        if(data.status == 'done'){
          let SendedMessage= document.createElement('div')
          SendedMessage.className='message'
          SendedMessage.classList.add('sendedMessage')
          document.getElementById('message-box').appendChild(SendedMessage)
          SendedMessage.innerHTML= document.getElementById('text').value ;
          document.getElementById('text').value = '';
          }

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("unable to send the message, please try again later");
      });
  }


})