const address = "https://jz-software.pw:8080"

window.onload = PageLoaded;

currentRoomData = {};


function PageLoaded(){
  if(Cookies.get("usertoken") == undefined){
    alert("You are not logged in, try again.");
    window.location = "index.html";
  }

  else{
    if(!CheckIfLoggedIn()){
      alert("You are not logged in, try again.");
      window.location = "index.html";
    }

    else{
      window.setInterval(UpdateData, 1500);
    }



  }
}

function UpdateData(){
  var reqUsers = new XMLHttpRequest();
  var reqRooms = new XMLHttpRequest();
  var token = Cookies.get("usertoken");
  reqUsers.open('GET', address + "/2/users", true);

  reqRooms.open('GET', address + "/2/chatrooms/getall", true);

  reqUsers.setRequestHeader("Token", token);
  reqRooms.setRequestHeader("Token", token);

  reqUsers.onreadystatechange = OnUsersReceived;

  reqRooms.onreadystatechange = OnRoomsReceived;

  reqUsers.send();

  reqRooms.send();

  function OnRoomsReceived(){
    var elemRoomsSelect = document.getElementById("selectRooms");
    if(reqRooms.readyState == 4){
      var rooms = JSON.parse(reqRooms.responseText).rooms;
      var index = elemRoomsSelect.selectedIndex;
      ClearSelect(elemRoomsSelect);
      for(room of rooms){
        var option = document.createElement("option");
        option.text = room;
        elemRoomsSelect.add(option);
      }

      elemRoomsSelect.selectedIndex = index;

    }

    if(elemRoomsSelect.selectedIndex == -1){
      document.getElementById("roomCapsule").style.display = "none";
    }
    else{
      document.getElementById("roomCapsule").style.display = "block";
    }

    if(elemRoomsSelect.options.length <= 0){
      var option = document.createElement("option");
      option.text = "-- No Rooms Available --"
      elemRoomsSelect.add(option);
    }

  }

  function OnUsersReceived(){
    var elemUsersSelect = document.getElementById("selectUsers");
    if(reqUsers.readyState == 4){
      var users = JSON.parse(reqUsers.responseText).users;
      var index = elemUsersSelect.selectedIndex;
      ClearSelect(elemUsersSelect);
      for(user of users){
        var option = document.createElement("option");
        option.text = user;

        elemUsersSelect.add(option);
      }

      elemUsersSelect.selectedIndex = index;

    }



  }

  // Need to get specific room data.

  var elemRoomsSelect = document.getElementById("selectRooms");

  var specRoomReq = new XMLHttpRequest();


  if(elemRoomsSelect.selectedIndex != -1){
    specRoomReq.open('POST', address + "/2/chatrooms/get", true);
    specRoomReq.setRequestHeader("Content-Type", "application/json");
    specRoomReq.setRequestHeader("Token", token);
    specRoomReq.onreadystatechange = RoomRequest;
    specRoomReq.send(JSON.stringify({
      "owner":elemRoomsSelect.options[elemRoomsSelect.selectedIndex].text
    }));
  }

  function RoomRequest(){
    if(specRoomReq.readyState == 4){
      // Write data to correct place.
      currentRoomData = JSON.parse(specRoomReq.responseText);

    }

    WriteRoomData();

  }


}

function WriteRoomData(){
  var txtTitle = document.getElementById("txtRoomTitle");
  var txtDescription = document.getElementById("txtRoomDescription");
  var chkPassword = document.getElementById("chkRoomPasswordEnabled");
  txtTitle.innerText = currentRoomData.title;
  txtDescription.innerText = currentRoomData.description;
  chkPassword.checked = currentRoomData.password_enabled;
}

function OpenRoom(){
  var password = "";
  if(currentRoomData.password_enabled){
    password = prompt("Please enter the room password.");
  }

  // Join room. Test b4 doing this tho.

}
