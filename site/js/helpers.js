function CheckIfLoggedIn(){
  var request = new XMLHttpRequest();
  var loggedIn = false;
  var token = Cookies.get("usertoken");

  request.open("GET", address + "/1/login", false);

  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Token", token);
  request.send();

  if(request.status == 200){
    loggedIn = true;
  }

  if(loggedIn){
    return true;
  }

  else{
    return false;
  }
}

function ClearSelect(obj){

  for(i = 0; i < obj.options.length; i++){
    obj.options[i] = null;
  }
}
