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
    var searchThisUrl = "https://api.twitch.tv/kraken/streams/" + users[i].toLowerCase() + "?callback=?";
    // console.log(users[i]);
    (function IIFE(i){
    $.getJSON(searchThisUrl, users[i], function(data) {
      if (data.stream === undefined) {
        // console.log("Account closed");
        console.log(users[i]);
        // console.log(users);
        addUnavailableDiv(users[i]);
      } else if (data.stream === null) {
        console.log("Offline");
      } else {
        console.log("streaming");
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
//5. append the new div to the body

function addUnavailableDiv(username) {
  console.log(username);
  var newDiv = $("<div>").addClass("unavailable")
  $("<img>").attr({
    src: "assets/images/nophoto_user.png",
    alt: "unavailable"
  }).appendTo(newDiv)
  $("<p>").addClass(".username").text
  // newDiv.appendTo(".users");
}

/*function addOfflineDiv(status, offlineUrl)
//0. create newDiv
//1. add the class offline to the newDiv
//1.5 set channelData to a call to getStreamerData w/ the offlineUrl 
//1.75 set logo to a call to channelData.logo
//2. create an img add a src attr of logo and append it to the newDiv 
//2.1 create a paragraph, add the class username, add text (which will be the current username) append it to the newDiv
//3. create a paragraph, add the class userinfo, add text (which will be Offline) append it to the newDiv
//5. append the new div to the body

/* function add OnlineDiv(status, logoUrl, game, streamInfo)
//0. create newDiv
//1. add the class online to the newDiv
//2. create an img add a src attr of logoUrl and append it to the newDiv
//3. create a paragraph, add the class username, add text (which will be the current username) append it  to the newDiv
//4. create a paragraph, add the class userinfo, add text (which will be game + : + streamInfo) append it to the newDiv
//5. append the newDiv to the body



/*
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