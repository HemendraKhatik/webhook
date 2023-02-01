const express = require('express');
const http = require('http')
const app = express();

var server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
var cors = require('cors');


app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.json({
    msg:"ok"
  })
})

app.post('/webhook', (req, res) => {
  io.emit('url', {
    data:req.body
  });
  res.json({
    status:"ok"
  });
});

io.on('connection', socket => {
  console.log('user is connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5000, () => {
  console.log('listening on port 5000');
});
