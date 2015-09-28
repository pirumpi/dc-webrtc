// Code goes here
window.onload = function(){
  var localVideo = document.querySelector('#localVideo'), 
  remoteVideo = document.querySelector('#remoteVideo'),
  localConnection, remoteConnection;
  
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mosGetUserMedia;
  window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mosRTCPeerConnection;
  
  navigator.getUserMedia({
    video: true,
    audio: false
  }, function(stream){
    localVideo.src = window.URL.createObjectURL(stream);
    startPeerConnection(stream);
    
  }, function(error){
    
  });
  
  function startPeerConnection(stream){
    var configuration = {
      'iceServers':[{'url':'stun:stun.1.google.com:19302'}, {'url':'stun:stun.2.google.com:19302'}]
    };
    
    localConnection = new window.RTCPeerConnection(configuration);
    remoteConnection = new window.RTCPeerConnection(configuration);
    
    localConnection.addStream(stream);
    remoteConnection.onaddstream = function(e){
      remoteVideo.src = window.URL.createObjectURL(e.stream);
    }
    
    localConnection.onicecandidate = function(event){
      if(event.candidate){
        remoteConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
      }
    }
    
    remoteConnection.onicecandidate = function(event){
      if(event.candidate){
        localConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
      }
    }
    
    
    localConnection.createOffer(function(offer){
      localConnection.setLocalDescription(offer);
      remoteConnection.setRemoteDescription(offer);
      
      remoteConnection.createAnswer(function(offer){
        remoteConnection.setLocalDescription(offer);
        localConnection.setRemoteDescription(offer);
      });
    });
  }
}