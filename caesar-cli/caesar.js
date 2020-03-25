const encode = (text, shift) => {
  let res = '';
  const key = Number(shift);

  for (let i = 0; i < text.length; i += 1) {
    if (/[a-zA-Z]/.test(text[i])) {
      if (text[i].toUpperCase() === text[i]) {
        res += String.fromCharCode((text.charCodeAt(i) + key - 65) % 26 + 65);
      } else {
        res += String.fromCharCode((text.charCodeAt(i) + key - 97) % 26 + 97);
      }
    } else {
      res += text[i];
    }
  }

  return res;
}

const decode = (text, shift) => {
  const newShift = (26 - Number(shift)) % 26;
  const res = encode(text, newShift);
  return res;
};

exports.encode = encode;
exports.decode = decode;
