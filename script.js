/*
 * https://stackoverflow.com/questions/247483/http-get-request-in-javascript
 */
console.log('AAAAAAAA')
var xhr = new XMLHttpRequest();
var wordListURL = 'https://davidruffner.github.io/scrabble-word-finder/resources/enable1-wwf-v4.0-wordlist.txt';

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
