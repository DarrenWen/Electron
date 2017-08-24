var http = require('http');
var url = require('url').parse('http://www.9958.pw/');
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');

http.get(url,function(res){
  var bufferHelper = new BufferHelper();
  res.on('data', function (chunk) {
      console.log(chunk);
    bufferHelper.concat(chunk);
  });
  res.on('end',function(){ 
    //console.log(iconv.decode(bufferHelper.toBuffer(),'GBK'));
  });
})