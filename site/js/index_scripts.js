//const address = "http://jz-software.pw:8080"
const address = "http://localhost:8080"
function ServerOnline(){

}

function SubmitLogin(){
  var request = new XMLHttpRequest();
  request.onreadystatechange = Req;
  request.open("POST", address + "/1/login", true)
  request.setRequestHeader("Content-Type", "application/json")


  request.send(JSON.stringify({
    username: document.getElementById("txtUsername").value,
    password: document.getElementById("txtPassword").value
  }));


  function Req(){
    if(RequestFinished(request)){
      var data = JSON.parse(request.responseText);
      if(request.status == 202){
        alert("Logged in! Your token: " + data.token);
        Cookies.set('usertoken', data.token);
        Cookies.set('username', document.getElementById("txtUsername").value);
      }

      else{
        alert("Error. " + data.msg);
      }


    }

  }
}

function RequestFinished(request){
  if(request.readyState == 4){
    return true;
  }

  else{
    return false;
  }
}

function ReadLogin(){
  var token = Cookies.get('usertoken');
  var uName = Cookies.get('username');

  alert(token + ": " + uName);
}
