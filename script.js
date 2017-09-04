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

function findWords() {
    var letters = document.getElementById("letters").value;
    var startsWith = document.getElementById("startsWith").value;
    var endsWith = document.getElementById("endsWith").value;
    var gapLength = document.getElementById("gapLength").value;

    /* Make sure that word list has been loaded */
    wordListRequest.then(function(response) {
      var words = response.split(/\r?\n/);  // Split on newlines
      console.log("Success1!", words[0]);
      var pattern = createPattern(startsWith, endsWith, gapLength);

      console.log('A match? ' + checkWord(pattern, words[0]));
      document.getElementById("demo").innerHTML = letters + startsWith + endsWith + gapLength;
    }, function(error) {
      console.error("Failed!", error);
    });
}

/**
  * Finds regex pattern to pick out words that start with and
  * end with certain letters and have a certain length gap.
  */
function createPattern(startsWith, endsWith, gapLength){
  startPattern = '^' + startsWith;
  endPattern = endsWith + '$';

  if (gapLength != ''){
    console.log('BBB')
    midPattern = '.{' + gapLength + ',' + gapLength + '}';
  }
  else {
    midPattern = '.+';
  }

  var re = new RegExp(startPattern + midPattern + endPattern);
  return re;
}

function checkWord(pattern, word){
  var res = pattern.exec(word);
  if (res == null){
    return false;
  }
  else{
    return res[0];
  }
}
