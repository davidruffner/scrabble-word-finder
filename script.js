/*
 * Use promise to ensure the words have been loaded before proceeding.
 * https://developers.google.com/web/fundamentals/getting-started/primers/promises
 */
function get(url) {
   // Return a new promise.
   return new Promise(function(resolve, reject) {
     // Do the usual XHR stuff
     var req = new XMLHttpRequest();
     req.open('GET', url);

     req.onload = function() {
       // This is called even on 404 etc
       // so check the status
       if (req.status == 200) {
         // Resolve the promise with the response text
         resolve(req.response);
       }
       else {
         // Otherwise reject with the status text
         // which will hopefully be a meaningful error
         reject(Error(req.statusText));
       }
     };

     // Handle network errors
     req.onerror = function() {
       reject(Error("Network Error"));
     };

     // Make the request
     req.send();
   });
 }

var wordListURL = 'https://davidruffner.github.io/scrabble-word-finder/resources/enable1-wwf-v4.0-wordlist.txt';
var wordListRequest = get(wordListURL)

function myFunction() {
    var letters = document.getElementById("letters").value;
    var startsWith = document.getElementById("startsWith").value;
    var endsWith = document.getElementById("endsWith").value;
    var gapLength = document.getElementById("gapLength").value;

    wordListRequest.then(function(response) {
      console.log("Success!", response);
      document.getElementById("demo").innerHTML = letters + startsWith + endsWith + gapLength;
    }, function(error) {
      console.error("Failed!", error);
    })


    //console.log('Now to get words')
    //var data = httpGet("http://www.greenworm.net/sites/default/files/gw-assets/enable1-wwf-v4.0-wordlist.txt");
    //document.getElementById("words").innerHTML = data;
}
