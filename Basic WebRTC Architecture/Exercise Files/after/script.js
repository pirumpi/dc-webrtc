// Code goes here

window.onload = function(){
   //Defining GetUserMedia for all browsers
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mosgetUserMedia;
  
  //querying dom elements
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var context = canvas.getContext('2d');
  var takePicture = document.querySelector('button');
  var dropDown = document.querySelector('select');

  
  //Getting users camera
  navigator.getUserMedia({video: true, audio: false}, function(stream){
    //Setting user's stream to video tag
    video.src = window.URL.createObjectURL(stream);
  }, function(error){ //Error Handler
    console.error(error);
  });
  
  takePicture.addEventListener('click', function(){
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  });
  
  dropDown.addEventListener('change', function(e){
    var filter = e.target.value;
    canvas.className = filter;
  });
  
  share.addEventListener('click', function(){
    postCanvasToFacebook('DavinciCoders', 'http://davincicoders.com', canvas, 'image/png');
  });
  
}