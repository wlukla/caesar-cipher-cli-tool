const { Transform } = require('stream');
const caesar = require('../utils/caesar');

const createTransformStream = (action, shift) => {
  class TransformStream extends Transform {
    constructor() {
      super()
    }

    _transform(chunk) {
      let processedData;

      switch (action) {
        case 'encode':
          processedData = caesar.encode(chunk.toString('utf-8'), shift);
          break;
        case 'decode':
          processedData = caesar.decode(chunk.toString('utf-8'), shift);
          break;
        default:
          console.error('Error');
          break;
      }

      this.push(processedData);
    }
  };

  return new TransformStream();
}

module.exports = createTransformStream;
