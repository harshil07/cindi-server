// cindi demo prototype server

var connect = require('connect');
var exec = require('child_process').exec;

try{
  var arduino = require('arduino')
    , board = arduino.connect('/dev/tty.usbmodem411')
    , val = arduino.LOW;
  
} catch(e){
  console.log(e.message);
}


connect().
use(connect.router(function(app){
  
  app.get('/on',function(req, res, next) {
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("on");
    console.log('Turned on');
    
    try{
      var buffer = new Buffer(1);
      buffer.write("1");
      board.sp.write(buffer);
    } catch(e){
      console.log(e.message);
    }
    
  
  });

  app.get('/off',function(req, res, next) {
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("off");
    console.log('Turned off');
    
    try{
      var buffer = new Buffer(1);
      buffer.write("1");
      board.sp.write(buffer);
    } catch(e){
      console.log(e.message);
    }


  });
  

  app.get('/sleep',function(req, res, next) {
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("sleep");
    console.log('Going to sleep');
    exec('osascript sleep.scpt');
  
  });

  app.get('/spotify/play-pause',function(req, res, next) {
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("play");
    console.log('Playing music');
    exec('osascript spotify-applescripts/spotify-playpause.applescript');
  });

  app.get('/spotify/next',function(req, res, next) {
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("play");
    console.log('Next track');
    exec('osascript spotify-applescripts/spotify-nexttrack.applescript');
  });


  app.get('/spotify/prev',function(req, res, next) {
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("play");
    console.log('Next track');
    exec('osascript spotify-applescripts/spotify-prevtrack.applescript');
  });
  
  
  
  app.get('/arduino/on',function(req, res, next) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("lights on");
    
    try{
      var buffer = new Buffer(1);
      buffer.write("1");
      board.sp.write(buffer);
    } catch(e){
      console.log(e.message);
    }
    // board.digitalWrite(5, arduino.HIGH);
  });


  app.get('/arduino/off',function(req, res, next) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("lights off");
    try{
      var buffer = new Buffer(1);
      buffer.write("1");
      board.sp.write(buffer);
    } catch(e){
      console.log(e.message);
    }
  });


})).
use(connect['static'](__dirname + '/public')).
use(connect.directory(__dirname + '/public')).
use(connect.favicon()).
use(connect.logger()).
listen(8080);



