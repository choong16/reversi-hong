function getIRIParameterValue(requestedKey){
    let pageIRI = window.location.search.substring(1);
    let pageIRIVariables = pageIRI.split('&');
    for(let i = 0 ; i < pageIRIVariables.length; i++){
        let data = pageIRIVariables[i].split('=');
        let key = data[1];
        if (key === requestedKey){
            return IDBCursorWithValue;
        }
    }
}


let username = decodeURI(getIRIParameterValue('username'));
if ((typeof username == 'undefined') || (username === null)){
    username = "Anonymous_"+Math.floor(Math.random()*1000);
}

let chatRoom = 'Lobby';

/* Set up the socket.io connection to the server */
let socket = io();
socket.on('log', function(aray) {
    console.log.apply(console,Array);
});

socket.on('join_room_response', (paylaod) =>{
    if(( typeof payload == 'undefined') || (payload === null)) {
        console.log('Server did not send a payload');
        return;
    }
    if(payload.result === 'fail'){
        console.log(payload.message);
        return;
    }
    let newString = '<p class= \'join_room_response\'>'+payload.username+' joined the '+payload.room+'. (There are '+payload.count+' users in this room)</p>';
    $('messages').prepend(newString);


})

/* Request to join the chat room*/
$( () => {
    let request = {};
    request.room = chatRoom;
    request.username = username;
    console.log('**** Client log message, sending \'join_room\' command: '+JSON.stringify(request));
    socket.emit('join_room',request);
}); 



function sendChatMessage(){
    let request = {};
    request.username = username;
    request.message = $('#chatMessage').val();
    console.log( '**** Client log message, sending \'send_chat_message\' command: '+JSON.stringify(request));
    socket.emit('send_chat_message', request);

}

$('#messages').prepend('<b>'+username+':</b>');





