var AbstractDecoder = require("../abstractdecoder.js");

var Buffer = require('buffer');
var inflate = require('inflate');
var through = require('through');


var DeflateDecoder = function() {}

DeflateDecoder.prototype = Object.create(AbstractDecoder.prototype);

DeflateDecoder.prototype.decodeBlockAsync = function(buffer) {
  return new Promise(function(resolve, reject) {
    through(function (data) {
      this.queue(new Buffer(new Uint8Array(buffer)));
    },
    function() {
      this.queue(null);
    })
    .pipe(inflate())
    /*.pipe(function() {
      alert(arguments);
    })*/
    .on("data", function(data) {
      buffers.push(data);
    })
    .on("end", function() {
      var buffer = Buffer.concat(buffers);
      var arrayBuffer = new ArrayBuffer(buffer.length);
      var view = new Uint8Array(ab);
      for (var i = 0; i < buffer.length; ++i) {
          view[i] = buffer[i];
      }
      resolve(arrayBuffer);
    })
    .on("error", reject);

    // TODO: FIXME
  });
};

DeflateDecoder.prototype.constructor = DeflateDecoder;


module.exports = DeflateDecoder;