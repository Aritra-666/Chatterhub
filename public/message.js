console.log(window.location.search);
const params = new URLSearchParams(window.location.search);
const receiver = params.get('messageTo')
console.log(receiver);
document.getElementById('receiver-name').innerHTML = receiver;






function getUser() {
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
      var Username = data.value
      console.log(Username)
      let conn = {

        user1: data.value,
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
          let messages = Array.from(data)
          console.log(messages)
          messages.forEach((element) => {
            let preMessages = document.createElement('div')
            preMessages.classList.add("message")
            document.getElementById('message-box').appendChild(preMessages)
            preMessages.innerHTML = element.message;
            if (element.from == Username) {
              preMessages.classList.add('sendedMessage')
            } else if (element.to == Username) {
              preMessages.classList.add('receivedMessage')
            }

          })




        })
    })

}

function getCookie(User) {
  let cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (User == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}


function getprofileIMG() {

  let name = {
    Name: receiver
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
      document.getElementById("profileimage").src = data

    });
}
window.addEventListener('load', () => {
  getUser();
  getprofileIMG();

  // let conn={

  //     user1: localStorage.getItem('user'),
  //     user2: receiver,

  // }
  // fetch("/ChatHistory", {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   body: JSON.stringify(conn),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     let messages=Array.from(data)
  //     messages.forEach((element)=>{
  //     let preMessages= document.createElement('div')
  //     preMessages.classUser='message'
  //     document.getElementById('message-box').appendChild(preMessages)
  //     preMessages.innerHTML= element.message ;
  //     if(element.from == localStorage.getItem('user')){
  //       preMessages.classList.add('sendedMessage')
  //     }else if(element.to == localStorage.getItem('user')){
  //       preMessages.classList.add('receivedMessage')
  //     }

  //   })




  //   })
  //   let User={
  //     User:receiver
  //   }
  //   fetch("/profileImage", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(User),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     document.getElementById("profileimage").src=data

  //   });

})
document.getElementById('send').addEventListener('click', () => {
  if (document.getElementById('text').value !== '') {
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
        let message = {
          from: data.value,
          to: document.getElementById('receiver-name').innerHTML,
          message: document.getElementById('text').value,
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

            if (data.status == 'done') {
              let SendedMessage = document.createElement('div')
              SendedMessage.classList.add("message")
              SendedMessage.classList.add('sendedMessage')
              document.getElementById('message-box').appendChild(SendedMessage)
              SendedMessage.innerHTML = document.getElementById('text').value;
              document.getElementById('text').value = '';
            }

          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            alert("unable to send the message, please try again later");
          });
      })






  }


})