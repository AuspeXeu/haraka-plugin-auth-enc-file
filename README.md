[![NPM][npm-img]][npm-url]

# haraka-plugin-auth-enc-file

[![Greenkeeper badge](https://badges.greenkeeper.io/AuspeXeu/haraka-plugin-auth-enc-file.svg)](https://greenkeeper.io/)

This plugin uses an encrypted file to authenticate a user. Currently only SHA512CRYPT is supported.

Configuration
-------------

Configuration is stored in `config/auth_enc_file.ini` and uses the INI style formatting.

Example:

```
[users]
user@domain.com={SHA512-CRYPT}$6$...
```

SHA512-CRYPT hashes can be generated using Dovecot like this:

`doveadm pw -s SHA512-CRYPT -u user@domain.com -p 'password'`

or using the provided `gen.js` like this:

`node ./gen.js [username] [password]`

[npm-img]: https://nodei.co/npm/haraka-plugin-auth-enc-file.png
[npm-url]: https://www.npmjs.com/package/haraka-plugin-auth-enc-file
