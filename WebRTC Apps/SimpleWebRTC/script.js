//Wait until all the dom elements are loaded
window.onload = function(){
    
    //Getting the room name from URL if available
    var room = location.search && location.search.split('?')[1];
    
    //Setting up WebRTC configuration
    var webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remoteVideos',
        autoRequestMedia: true
    });
    

    //WebRTC is ready to receive or make call
    webrtc.on('readyToCall', function(){
    	//Checking for room to join the chat
    	if(room) webrtc.joinRoom(room);
    });

    //No room in the URL, let allow users to create one
    if(!room){
    	var form = document.querySelector('form');

    	form.addEventListener('submit', function(event){
    		//prevent the form from reloading the page
    		event.preventDefault();

    		var name = document.querySelector('input[name="roomName"]').value;

    		//create chat room
    		webrtc.createRoom(name, function(){
    			//creating new chat room url
    			var newUrl = location.pathname + '?' + name;

    			//changing url history
    			history.replaceState({}, null, newUrl);

    			//Add chat room link to UI
    			document.getElementById('link').innerText = location.href;
    		});
    	})
    }

}