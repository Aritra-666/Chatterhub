document.getElementById("search-button").addEventListener("click", () => {
    document.getElementById("search-button").innerHTML="wait..."
    document.getElementById("search-button").classList.add("flick")
  const username = document.getElementById("search-input").value;
  console.log(username);
  if (username == "") {
    alert("Enter valid username");
  }else if(username == localStorage.getItem("user")){
    document.getElementById("search-button").classList.remove("flick");
    document.getElementById("search-button").innerHTML="search";
    document.getElementById("result").style.display='flex'
    document.getElementById("result").innerHTML = "No user found";
  } else {
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
          document.getElementById("result").innerHTML = data;
        }else{
          document.getElementById("result").style.display='flex'
          document.getElementById("result").innerHTML = "No user found";
        }
      });
  }
});
document.getElementById("result").addEventListener('click',()=>{
   
    if(document.getElementById("result").innerHTML !==  "No user found"){
        
      let name={
        Name:document.getElementById("result").innerHTML
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
