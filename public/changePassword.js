const sessionID=getCookie("sessionID")

document.getElementById("submit").addEventListener('click',()=>{
    document.getElementById("loaddiv").style.display="inline"
 let EnteredData={
   ID:sessionID,
   OldPassword: document.getElementById("old-password").value,
   NewPassword: document.getElementById("new-password").value
 }
 fetch("/ChangePassword", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(EnteredData),
  })
    .then((response) => response.json())
    .then((data) => { 
    console.log(data)
if(data.acknowledged == true && data.modifiedCount == 1 ){
    alert("Password updatation sucessfull")
     document.getElementById("loaddiv").style.display="none"
}else if(data.acknowledged == false && data.modifiedCount == 0 ){
    alert("Wrong password")
        document.getElementById("loaddiv").style.display="none"
} else{
    alert("Something went wrong!")
    document.getElementById("loaddiv").style.display="none"
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