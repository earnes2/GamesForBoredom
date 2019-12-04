//function for the moveable image elements using jQuery
$(function()
    {
        $("#MoveMe1").draggable();
        $("#MoveMe2").draggable();
        $("#MoveMe3").draggable();
        $("#MoveMe4").draggable();
        $("#MoveMe5").draggable(); 
        $("#MoveMe6").draggable();
        $("#MoveMe7").draggable();
        $("#MoveMe8").draggable();
        $("#MoveMe9").draggable();                      
    });
    
//function for the modal window features
var modal = document.getElementById('hintModal');
var btn = document.getElementById("hintButton");
var span = document.getElementsByClassName("exit")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}