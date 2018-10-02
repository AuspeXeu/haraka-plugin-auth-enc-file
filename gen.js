#!/usr/bin/node

if (process.argv.length < 4) {
  console.log('Usage: gen.js [username] [password]')
  return
}

const user = process.argv[2];
const pass = process.argv[3];

const crypto = require('crypto');
const sha512crypt = require('sha512crypt-node').sha512crypt;
const genRandomString = len => crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0,len);
const salt = genRandomString(16);

hash = sha512crypt(pass, salt);
console.log(`${user}={SHA512-CRYPT}${hash}`);
