/*
function getStreamerData (url) {
  return $.getJSON(url, function(data) {
    return data;
  // console.log(data._links.channel);
  // console.log(data.stream.channel.logo);
  });
}
*/

// getStreamerData('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?');
// getStreamerData('https://api.twitch.tv/kraken/streams/esl_sc2?callback=?');
// getStreamerData('https://api.twitch.tv/kraken/streams/brunofin?callback=?');
// getStreamerData('https://api.twitch.tv/kraken/channels/freecodecamp');

/*So what I need to do is*/
//1. create all function (DONE! maybe refactor)
//2. create online function (DONE! maybe refactor)
//3. create offline function (DONE! maybe refactor)
//4. create event handlers for clicking the all, online and offline buttons (DONE! maybe refactor)
//5. create search function (optional)
//6. fix modify the appearance and cursor for the all, online and offline buttons
  //1. have it slideout like in the FCC example
  //2. set the pointer to a cursor when hovering over the buttons (DONE)
  //3. disable the button when it is the current state (DONE)


/*searchThroughUsers function
//1. create an array of all the users I want 
//2. iterate over the array
//3. call the getStreamerData function on a string of "https://api.twitch.tv/kraken/streams/" + users.toLowercase() + ?callback=?
//4. if data.stream equals undefined (closed account)
  /* separate this into a function? */
  //0. call the addDiv function w/ the argument acctClosed
//5.else if data.stream equals null
  //0. var url equals data._links.channel
  //1. call the addDiv function w/ the argument offline and url
//6. else 
  //1. var logoUrl equals data.stream.channel.logo
  //1.5 var game equals data.stream.channel.game
  //1.75 var streamInfo = data.stream.channel.status
  //2. call the addDiv function w/ the argument online, logoUrl, game, streamInfo

/*
function justGetUsers() {
  var users = ["storbeck", "ESL_SC2", "Habathcx", "FreeCodeCamp", "RobotCaleb", "cretetion", "noobs2ninjas", "comster404", "OGamingSC2", "sheevergaming", "Beohoff", "TR7K", "brunofin", "Test_channel"];
  return users;
}*/

function clearAndGetUsers(click) {
  $(".users").empty();
  var users = ["storbeck", "ESL_SC2", "Habathcx", "FreeCodeCamp", "RobotCaleb", "cretetion", "noobs2ninjas", "comster404", "OGamingSC2", "sheevergaming", "Beohoff", "TR7K", "brunofin", "Test_channel"]
  if (click === "click") {
    $("[name=search]").val("");
  }
  return users;
}

function all(click) {
  // console.log(click);
  var users = clearAndGetUsers(click);
  // console.log("clicked on all")
  // console.log(event);
  // console.log(event.target)
  $("#all").css({
    "pointer-events": "none",
    "background-color": "yellow"
  }).css("background-color", "yellow");
  $("#online").css({
    "pointer-events": "auto",
    "background-color": "rgb(225, 225, 230)"
  });
  $("#offline").css({
    "pointer-events": "auto",
    "background-color": "rgb(225, 225, 230)"
  });
  $("[name=search]").attr("placeholder", "Search All Users By Username");
  // $("#all").attr("disabled", true);
  // $("#online").removeAttr("disabled");
  // $("#offline").removeAttr("disabled");
  for (var i = 0; i < users.length; i++) {
    var searchThisUrl = "https://api.twitch.tv/kraken/streams/" + users[i].toLowerCase() + "?callback=?"; //I actually needed to add this semicolon
    // console.log(users[i]);
    (function IIFE(i){
    $.getJSON(searchThisUrl, function(data) {
      if (data.stream === undefined) {
        // console.log("Account closed");
        // console.log(users[i]);
        // console.log(users);
        addUnavailableDiv(users[i]);
      } else if (data.stream === null) {
        // console.log("Offline");
        // console.log("hits this if");
        // console.log("this is the url I want", data._links.channel);
        addOfflineDiv(users[i], data._links.channel)
      } else {
        // console.log("streaming");
        // console.log("This is the image: ", data.stream.channel.logo);
        // console.log("This is the game: ", data.stream.channel.game)
        // console.log("This is the stream info: ", data.stream.channel.status)
        addOnlineDiv(users[i], data.stream.channel.logo, data.stream.channel.game, data.stream.channel.status)
      }
    })
  })(i)
  }
 }

 function online(click){
  var users = clearAndGetUsers(click);
  $("#all").css({
    "pointer-events": "auto",
    "background-color": "rgb(225, 225, 230)"
})
  $("#online").css({
    "pointer-events": "none",
    "background-color": "yellow"
});
  $("#offline").css({
    "pointer-events": "auto",
    "background-color": "rgb(225, 225, 230)"
  });
  $("[name=search]").attr("placeholder", "Search Online Users By Username");
  for (var i = 0; i < users.length; i++) {
    var searchThisUrl = "https://api.twitch.tv/kraken/streams/" + users[i].toLowerCase() + "?callback=?"; //I actually needed to add this semicolon
    (function IIFE(i){
    $.getJSON(searchThisUrl, function(data) {
      if (data.stream) {
        // console.log("Offline");
        // console.log("hits this if");
        // console.log("this is the url I want", data._links.channel);
        addOnlineDiv(users[i], data.stream.channel.logo, data.stream.channel.game, data.stream.channel.status)
      }
    })
  })(i)
 }
}

function offline(click){
  var users = clearAndGetUsers(click);
  $("#all").css({
    "pointer-events": "auto",
    "background-color": "rgb(225, 225, 230)"
  });
  $("#online").css({
    "pointer-events": "auto",
    "background-color": "rgb(225, 225, 230)"
  });
  $("#offline").css({
    "pointer-events": "none",
    "background-color": "yellow"
});
  $("[name=search]").attr("placeholder", "Search Offline Users By Username");
  for (var i = 0; i < users.length; i++) {
    var searchThisUrl = "https://api.twitch.tv/kraken/streams/" + users[i].toLowerCase() + "?callback=?"; //I actually needed to add this semicolon
    (function IIFE(i){
    $.getJSON(searchThisUrl, function(data) {
      if (data.stream === null) {
        // console.log("Offline");
        // console.log("hits this if");
        // console.log("this is the url I want", data._links.channel);
        addOfflineDiv(users[i], data._links.channel)
      }
      if (data.stream === undefined) {
        // console.log("Account closed");
        // console.log(users[i]);
        // console.log(users);
        addUnavailableDiv(users[i]);
      } 
    })
  })(i)
}
}

function search(){
  // console.log("the search function executes");
  if ($("[name=search]").attr("placeholder") === "Search All Users By Username") {
    // console.log("It hits all users!");
    searchAll();
  } else if ($("[name=search]").attr("placeholder") === "Search Online Users By Username"){
      // console.log("It hits online users!")
      searchOnline();
  } else {
    // console.log("It hits offline users!");
    searchOffline();
  }
}

//0. clear and get the users
//1. iterate over the array of users 
  //2. if the input text equals a slice of the current user from 0 to the input text length
    //1. use the same logic as the all function to add a div
function searchAll(){
  // console.log("in search all function")
  // all("not a click");
  // console.log("all has run");
  var users = clearAndGetUsers();
  // console.log(searchInput["0"].value);
  for (var i = 0; i < users.length; i++) {
    var searchThisUrl = "https://api.twitch.tv/kraken/streams/" + users[i].toLowerCase() + "?callback=?"; //I actually needed to add this semicolon
    // console.log(users[i]);
    (function IIFE(i){
    $.getJSON(searchThisUrl, function(data) {
      var searchInput = $("[name=search]")
      var searchText = searchInput["0"].value
      // console.log(searchInput["0"].value);
      if (searchText === users[i].slice(0,searchText.length)){
        if (data.stream === undefined) {
        // console.log("Account closed");
        // console.log(users[i]);
        // console.log(users);
        addUnavailableDiv(users[i]);
      } else if (data.stream === null) {
        // console.log("Offline");
        // console.log("hits this if");
        // console.log("this is the url I want", data._links.channel);
        addOfflineDiv(users[i], data._links.channel)
      } else {
        // console.log("streaming");
        // console.log("This is the image: ", data.stream.channel.logo);
        // console.log("This is the game: ", data.stream.channel.game)
        // console.log("This is the stream info: ", data.stream.channel.status)
        addOnlineDiv(users[i], data.stream.channel.logo, data.stream.channel.game, data.stream.channel.status)
      }
      }
    })
  })(i)
  }
 }

 //1. get users via clearAndGetUsers
 //2. iterate over the users
 //3. make an api call for each user
 //4. if the value of the searchText equals the value of the user (sliced from 0 to searchText length)
 //5. if the value of the stream is truthy
 //6. call addOnlineDiv function
 function searchOnline(){
  var users = clearAndGetUsers();
  for (var i = 0; i < users.length; i++) {
    var searchThisUrl = "https://api.twitch.tv/kraken/streams/" + users[i].toLowerCase() + "?callback=?"; //I actually needed to add this semicolon
    (function IIFE(i){
    $.getJSON(searchThisUrl, function(data) {
      var searchInput = $("[name=search]");
      var searchText = searchInput["0"].value;
      if (searchText === users[i].slice(0,searchText.length)) {
        if (data.stream) {
          // console.log("Offline");
          // console.log("hits this if");
          // console.log("this is the url I want", data._links.channel);
          addOnlineDiv(users[i], data.stream.channel.logo, data.stream.channel.game, data.stream.channel.status)
      }
    }
    })
  })(i)
 }
}

//1. get users via clearAndGetUsers
//2. iterate over the users
//2.5 make call to api for each user
//3. if the input search equals the value of the user (slice from 0 to the length)
  //1. call the make offline dive function
function searchOffline(){
  var users = clearAndGetUsers();
  for (var i = 0; i < users.length; i++) {
      var searchThisUrl = "https://api.twitch.tv/kraken/streams/" + users[i].toLowerCase() + "?callback=?"; //I actually needed to add this semicolon
      (function IIFE(i){
      $.getJSON(searchThisUrl, function(data) {
        var searchInput = $("[name=search]")
        var searchText = searchInput["0"].value;
        // console.log(searchText);
        if (searchText === users[i].slice(0,searchText.length)) {
          if (data.stream === null) {
          // console.log("Offline");
          // console.log("hits this if");
          // console.log("this is the url I want", data._links.channel);
          addOfflineDiv(users[i], data._links.channel)
          }
          if (data.stream === undefined) {
        // console.log("Account closed");
        // console.log(users[i]);
        // console.log(users);
        addUnavailableDiv(users[i]);
          } 
        }
      })
    })(i)
  }
}

all("initialized");
 $("#all").on("click", function(){
  all("click");
 });
 $("#online").on("click", function(){
  online("click");
 });
 $("#offline").on("click", function(){
  offline("click");
 });
 $("[name=search]").on("keypress",search);
 $("[name=search]").on("keyup",function(e){
    if (e.keyCode == 8){
      // console.log("delete key pressed");
      search();
    }
 });
//END: call all function when page loads

/*function addUnavailableDiv*/
//0. create newDiv
//1. add the class unavailable to the newDiv
//1.5 create a blank profile image add the src of the image via attr add the selector .users img append it to the the newDiv
//1.6 create a paragraph, add the class username, add text (which will be the current username) append it to the newDiv
//2. create a paragraph, add the class userinfo, add text (which will be Account Closed) append it to the newDiv
//5. append the new div to the end of the .users section

function addUnavailableDiv(username) {
  // console.log(username);
  var newDiv = $("<div>").addClass("unavailable")
  $("<img>").attr({
    src: "assets/images/nophoto_user.png",
    alt: "unavailable"
  }).appendTo(newDiv);
  $("<p>").addClass("username").text(username).appendTo(newDiv);
  $("<p>").addClass("userinfo").text("Account Closed").appendTo(newDiv);
  newDiv.appendTo(".users");
}

/*function addOfflineDiv(username, offlineUrl)
//0. create newDiv
//1. add the class offline to the newDiv
//1.5 set channelData to a call to getStreamerData w/ the offlineUrl 
//1.75 set logo to a call to channelData.logo
//2. create an img add a src attr of logo and append it to the newDiv 
//2.1 create a paragraph, add the class username, add text (which will be the current username) append it to the newDiv
//3. create a paragraph, add the class userinfo, add text (which will be Offline) append it to the newDiv
//5. append the new div to the body*/

function addOfflineDiv(username, offlineUrl) {
  // console.log(username, offlineUrl);
  var newDiv = $("<div>").addClass("offline");
  $.getJSON(offlineUrl, function(data){
    var logo = data.logo;
    // console.log(logo);
    if (logo === null) {
      $("<img>").attr({
    src: "assets/images/nophoto_user.png",
    alt: "unavailable"
  }).appendTo(newDiv);
    $("<p>").addClass("username").text(username).appendTo(newDiv);
    $("<p>").addClass("userinfo").text("Offline").appendTo(newDiv);
    newDiv.appendTo(".users");
    } else {
      $("<img>").attr({
        src: logo,
        alt: "profile-pic"
      }).appendTo(newDiv);
      $("<p>").addClass("username").text(username).appendTo(newDiv);
    $("<p>").addClass("userinfo").text("Offline").appendTo(newDiv);
    newDiv.appendTo(".users");
    }
  })

}

/* function add OnlineDiv(username, logoUrl, game, streamInfo)
//0. create newDiv
//1. add the class online to the newDiv
//2. create an img add a src attr of logoUrl and append it to the newDiv
//3. create a paragraph, add the class username, add text (which will be the current username) append it  to the newDiv
//4. create a paragraph, add the class userinfo, add text (which will be game + : + streamInfo) append it to the newDiv
//5. append the newDiv to the body*/

function addOnlineDiv(username, logoURL, game, streamInfo) {
  // console.log(username, logoURL, game, streamInfo);
  var newDiv = $("<div>").addClass("online");
  $("<img>").attr({
    src: logoURL,
    alt: "profile-pic"
  }).appendTo(newDiv);
  // console.log("hit this in addOnlineDiv");
  $("<p>").addClass("username").text(username).appendTo(newDiv);
  $("<p>").addClass("userinfo").text(game + ": " + streamInfo).appendTo(newDiv);
  newDiv.appendTo(".users");
}

/* sample divs originally in index.html representing a sample online user, offline user, and user w/ a closed account (given the class unavailable)
      <div class="online">
        <img src="http://res.cloudinary.com/dyr8j9g6m/image/upload/v1469217425/logo-placeholder_uuxw8l.png" alt="sample-logo">
        <!--<img src="assets/images/logo-placeholder.png" alt="sample-logo"> -->
        <p class="username">OnlineUser</p>
        <p class="userinfo">Blablabla. I'm streaming stuff.</p>
      </div>
      <div class="offline">
        <img src="http://res.cloudinary.com/dyr8j9g6m/image/upload/v1469217425/logo-placeholder_uuxw8l.png" alt="sample-logo">
        <!-- <img src="assets/images/logo-placeholder.png" alt="sample-logo"> -->
        <p class="username">OfflineUser</p>
        <p class="userinfo">Blablabla. I'm not streaming stuff.</p>
      </div>
      <div class="unavailable">
        <img src="http://res.cloudinary.com/dyr8j9g6m/image/upload/v1469217425/logo-placeholder_uuxw8l.png" alt="sample-logo">
        <!-- <img src="assets/images/logo-placeholder.png" alt="sample-logo"> -->
        <p class="username">UnavailableUser</p>
        <p class="userinfo">Blablabla. I'm never streaming stuff.</p>
      </div>
*/

/* attempt to get the api via vanillaJS
var getData = function(url) {

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  // request.send();
  request.send();
  console.log("this is the data", request.response);
  console.log("working here");
}
getData('https://api.twitch.tv/kraken/streams/esl_sc2');
*/


/*function httpGet(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  console.log(xhr);
}

httpGet('https://api.twitch.tv/kraken/streams/esl_sc2');
*/