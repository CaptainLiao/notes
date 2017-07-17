let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http)

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

http.listen(3000, () => {
    console.log('listening on *:3000')
})