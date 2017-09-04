function myFunction() {
    var letters = document.getElementById("letters").value;
    var startsWith = document.getElementById("startsWith").value;
    var endsWith = document.getElementById("endsWith").value;
    var gapLength = document.getElementById("gapLength").value;
    document.getElementById("demo").innerHTML = letters + startsWith + endsWith + gapLength;
}
