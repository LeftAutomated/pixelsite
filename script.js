var redV = document.getElementById("redValue");
var greenV = document.getElementById("greenValue");
var blueV = document.getElementById("blueValue");

var clrSqr = document.getElementById("coloredSquare");

var isClosed = true;
var mySide = document.getElementById("mySideNav");

redV.oninput = function() {
  redV.value = this.value;
  clrSqr.style.backgroundColor = colorChange();
}

greenV.oninput = function() {
  greenV.value = this.value;
  clrSqr.style.backgroundColor = colorChange();
}

blueV.oninput = function() {
  blueV.value = this.value;
  clrSqr.style.backgroundColor = colorChange();
}

function colorChange(){
  return 'rgb(' + redV.value + ',' + greenV.value + ',' + blueV.value + ')';
}

function transforming(x){
  x.classList.toggle("change");
  if(isClosed == true){
    mySide.style.width = "150px";
  }
  else{
    mySide.style.width = "0";
  }
  isClosed = !isClosed;
}

var canvas = document.getElementById("grid");
var cont = canvas.getContext("2d");
var xx = 1;
var sizeSelect = document.getElementById("sizes");
var side = sizeSelect.value;
var sideNum = canvas.width/side;

sizeSelect.onchange = function(){
  side = this.value;
  sideNum = canvas.width/side;
  backGrid();
}

backGrid();

function backGrid(){
  for(var i = 0; i < side; i++){
    for(var j = 0; j < side; j++){
      if(j % 2 == xx)
        cont.fillStyle = 'rgb(172,172,172)';
      else
        cont.fillStyle = 'rgb(204,204,204)';
      cont.fillRect(j * sideNum, i * sideNum, sideNum, sideNum);
    }
    xx = (xx == 1) ? 0 : 1;
  }
}

var myColor = document.getElementById("myGrid");
var myCont = myColor.getContext("2d");
var canColor = true;
var canFlow = false;
var canErase = false;

myColor.addEventListener("mousedown", function(){
  canFlow = true;
});

myColor.addEventListener("mousemove", function(event){
  var xpos = event.clientX;
  var ypos = event.clientY;
  var x = Math.floor((xpos - myColor.offsetLeft)/sideNum);
  var y = Math.floor((ypos - myColor.offsetTop)/sideNum);
  myCont.fillStyle = colorChange();
  if(canColor && canFlow)
    myCont.fillRect(x * sideNum, y * sideNum, sideNum, sideNum);
  else if(canErase && canFlow)
    myCont.clearRect(x * sideNum, y * sideNum, sideNum, sideNum);
});

myColor.addEventListener("click", function(event){
  var xpos = event.clientX;
  var ypos = event.clientY;
  var x = Math.floor((xpos - myColor.offsetLeft)/sideNum);
  var y = Math.floor((ypos - myColor.offsetTop)/sideNum);
  myCont.fillStyle = colorChange();
  if(canColor)
    myCont.fillRect(x * sideNum, y * sideNum, sideNum, sideNum);
  else if(canErase)
    myCont.clearRect(x * sideNum, y * sideNum, sideNum, sideNum);
});

myColor.addEventListener("mouseup", function(){
  canFlow = false;
});

var pen = document.getElementById("penButton");
var erase = document.getElementById("eraseButton");

pen.addEventListener("click", function(){
  pen.style.border = "solid";
  pen.style.borderColor = "red";
  erase.style.border = "none";
  canColor = true;
  canErase = false;
});

erase.addEventListener("click", function(){
  erase.style.border = "solid";
  erase.style.borderColor = "red";
  pen.style.border = "none";
  canColor = false;
  canErase = true;
});

var clear = document.getElementById("clearButton");
clear.addEventListener("click", function(){
  myCont.clearRect(0, 0, myColor.width, myColor.height);
});

var savedImg = document.getElementById("saved");
var imgNum = 1;
savedImg.addEventListener("click", function(event){
  localStorage.setItem(imgNum, myColor.toDataURL());
  savedImg.src = myColor.toDataURL();
  imgNum++;
});

var myPalette = document.getElementById("palette");

myColor.addEventListener("click", function(event){
  var xpos = event.clientX;
  var ypos = event.clientY;
  var x = Math.floor((xpos - myColor.offsetLeft)/sideNum);
  var y = Math.floor((ypos - myColor.offsetTop)/sideNum);
  myCont.fillStyle = colorChange();
  if(canColor)
    myCont.fillRect(x * sideNum, y * sideNum, sideNum, sideNum);
  else if(canErase)
    myCont.clearRect(x * sideNum, y * sideNum, sideNum, sideNum);
});

