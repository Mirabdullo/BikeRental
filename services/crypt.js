const crypto = require("crypto"); 
const config = require("config"); 
const password = config.get("crypt_password"); 
let iv = Buffer.from(config.get("iv")); // Initialization vector. 
let ivstring = iv.toString("hex"); 
 
function sha1(input) { 
  return crypto.createHash("sha1").update(input).digest(); 
} 
 
function password_derive_bytes(password, salt, iterations, len) { 
  let key = Buffer.from(password + salt); 
  for (let i = 0; i < iterations; i++) { 
    key = sha1(key); 
  } 
  if (key.length < len) { 
    let hx = password_derive_bytes(password, salt, iterations - 1, 20); 
    for (let counter = 1; key.length < len; ++counter) { 
      key = Buffer.concat([ 
        key, 
        sha1(Buffer.concat([Buffer.from(counter.toString()), hx])), 
      ]); 
    } 
  } 
  return Buffer.alloc(len, key); 
} 
 
async function encode(string) { 
  let key = password_derive_bytes(password, "", 100, 32); 
  let cipher = crypto.createCipheriv("aes-256-cbc", key, ivstring); 
  let part1 = cipher.update(string, "utf8"); 
  let part2 = cipher.final(); 
  const encrypted = Buffer.concat([part1, part2]).toString("base64"); 
  return encrypted; 
} 
 
async function decode(string) { 
  let key = password_derive_bytes(password, "", 100, 32); 
  let decipher = crypto.createDecipheriv("aes-256-cbc", key, ivstring); 
  let decrypted = decipher.update(string, "base64", "utf8"); 
  decrypted += decipher.final(); 
  return decrypted; 
} 
 
module.exports = { encode, decode };