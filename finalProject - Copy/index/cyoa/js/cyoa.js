var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
center: {lat: 43.475140, lng: 142.639182},
zoom: 20
});
}

 document.getElementById("button").addEventListener("click",function(){
     var userResponse = prompt("Do you know where you are? You are at a...? (HINT: TLC)")
     var ur = userResponse.toUpperCase();
     if (ur == "WATERFALL"){
        document.getElementById("result").innerHTML = "<p><a href='save.html'>CLICK HERE!!!</a></p>"     
        }
    else (document.getElementById("result").innerHTML = "<p><a href='dead.html'>CLICK HERE TO PROCEED</p>")
});
