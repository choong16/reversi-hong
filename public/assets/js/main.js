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

let chatRoom = 'Lobby';

/* Set up the socket.io connection to the server */
let socket = io();
socket.on('log', function(aray) {
    console.log.apply(console,array);
});

/* Request to join the chat room*/
$( () => {
    let request = {};
    request.room = chat_room;
    request.username = username;
    console.log('**** Client log message, sending \'join_room\' command: '+JSON.stringify(request));
    socket.emit('join_room',payload);
}); 


let username = decodeURI(getIRIParameterValue('username'));
if ((typeof username == 'undefined') || (username === null)){
    username = "Anonymous_"+Math.floor(Math.random()*1000);
}

$('#messages').prepend('<b>'+username+':</b>');


let socket = io();
socket.on('log',function(array) {
    console.log.apply(console,array);
});

