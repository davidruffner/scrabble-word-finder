

//Run Sample

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

makeCorsRequest();

/*
 * https://stackoverflow.com/questions/247483/http-get-request-in-javascript
 */
console.log('AAAAAAAA')
var xhr = new XMLHttpRequest();
var wordListURL = "https://github.com/davidruffner/scrabble-word-finder/raw/master/resources/enable1-wwf-v4.0-wordlist.txt"
xhr.open('GET', wordListURL, true);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  console.log('BBBBBBB');
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = xhr.responseText;
    //alert(response.ip);
    console.log(response);
  }
}

function myFunction() {
    var letters = document.getElementById("letters").value;
    var startsWith = document.getElementById("startsWith").value;
    var endsWith = document.getElementById("endsWith").value;
    var gapLength = document.getElementById("gapLength").value;
    document.getElementById("demo").innerHTML = letters + startsWith + endsWith + gapLength;

    //console.log('Now to get words')
    //var data = httpGet("http://www.greenworm.net/sites/default/files/gw-assets/enable1-wwf-v4.0-wordlist.txt");
    //document.getElementById("words").innerHTML = data;
}
