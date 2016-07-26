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
//1. create all function
//2. create online function
//3. create offline function
//4. create search function (optional)
//5. create event handlers for clicking the all, online and offline buttons


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

function searchThroughUsers(status) {
  var users = ["storbeck", "ESL_SC2", "Habathcx", "FreeCodeCamp", "RobotCaleb", "cretetion", "noobs2ninjas", "comster404", "OGamingSC2", "sheevergaming", "Beohoff", "TR7K", "brunofin", "Test_channel"]
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
 searchThroughUsers();

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