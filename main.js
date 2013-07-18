var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs'), twitter = require('ntwitter')
  , util = require('util');


var twit = new twitter({
  consumer_key: 'AGYON8KQuuczfzo6e2dzDA',
  consumer_secret: 'uJIM9AHun1uwksyIfjWJjwDnhijPW09swHyQNeWp6Uw',
  access_token_key: '167767950-epwVylMCepmOJqkb27qvmclsIz4uONQi2sU6Jkw4',
  access_token_secret:'6XVEAzNxHFiQ18CBjvo7TtCqscK9FSJ05F0eOpP24'
});


app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function(socket) {
  twit.stream('statuses/filter', {'track':'cnnbrk'},
    function(stream) {
      stream.on('data',function(data){
        socket.emit('twitter',data);
      });
    });
});

