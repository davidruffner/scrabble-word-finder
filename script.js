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
      var patterns = createPatterns(startsWith, endsWith, gapLength);
      console.log(patterns);
      console.log(patterns.pattern);
      if (checkWord(patterns.pattern, words[0])){
        console.log('It is a match!');
        console.log(split(words[0],
                          patterns.startPattern,
                          patterns.endPattern));
      }
      else {
        console.log('No match');
      }
      document.getElementById("demo").innerHTML = letters + startsWith + endsWith + gapLength;
    }, function(error) {
      console.error("Failed!", error);
    });
}

/**
  * Finds regex pattern to pick out words that start with and
  * end with certain letters and have a certain length gap.
  */
function createPatterns(startsWith, endsWith, gapLength){
  var startPattern = '^' + startsWith;
  var endPattern = endsWith + '$';

  if (gapLength != ''){
    console.log('BBB')
    var midPattern = '.{' + gapLength + ',' + gapLength + '}';
  }
  else {
    var midPattern = '.+';
  }

  return {
    pattern: new RegExp(startPattern + midPattern + endPattern),
    startPattern: new RegExp(startPattern),
    endPattern: new RegExp(endPattern)
  };
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

/**
  * Get none empty splits from a regex pattern applied to a word.
  */
function getNonZeroSplits(pattern, word){
  console.log('word' + word);
  console.log('pattern' + pattern)
  splits = word.split(pattern);
  var nonZeroSplits = splits.filter(function(split){
    return split != '';
  });
  console.log(nonZeroSplits);
  return nonZeroSplits;
}

/**
  * Find leftover fragment after removing characters found by
  * startPattern and endPattern.
  */
function split(word, startPattern, endPattern){
  end = getNonZeroSplits(startPattern,word)[0];
  var finalSplits = getNonZeroSplits(endPattern, end);
  middle = finalSplits[finalSplits.length - 1];
  console.log(middle)
  console.log('AAAA')
  return middle;
}
