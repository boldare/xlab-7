// This class provides a parser for frames with defined header and frame length.
class FrameWithHeaderParser {
  getParser(header, frameLen) {
    if (Object.prototype.toString.call(header) !== '[object Array]') {
      header = [ header ];
    }
    var buf = [];
    var nextDelimIndex = 0;

    function clearBuffer() {
      buf = [];
      nextDelimIndex = 0;
    }

    return function(emitter, buffer) {
      for (let i = 0; i < buffer.length && i < frameLen; ++i) {
        // Detect frame header.
        if (buf.length < header.length) {
          if (buffer[i] === header[nextDelimIndex]) {
            ++nextDelimIndex;
            buf[buf.length] = buffer[i];
          } else {
            // Header is not valid - abort.
            clearBuffer();
          }
        } else {
          // Header found - read the data.
          buf[buf.length] = buffer[i];
          if (buf.length === frameLen) {
            // All data bytes read. Submit data and clear the buffer.
            emitter.emit('data', buf);
            clearBuffer();
          }
        }
      }
    };
  }
}

module.exports = new FrameWithHeaderParser();
