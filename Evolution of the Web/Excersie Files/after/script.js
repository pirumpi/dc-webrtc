// Code goes here

window.onload = function(){
  /*var body = document.body;
  body.style.background = "#ff9";   */
  
  var colorPicker = document.getElementById('color');
  colorPicker.addEventListener('change', function(){
    document.body.style.background = this.value;
  });
  
  var countryList = document.querySelector('select');
  countryList.addEventListener('change', function(){
    var msg = document.querySelector('#message');
    msg.value = this.value + ' Rocks';
  });
  
}
