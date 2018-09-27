[![NPM][npm-img]][npm-url]

# haraka-plugin-auth-enc-file

This plugin uses an encrypted file to authenticate a user. Currently only SHA512CRYPT is supported.

Configuration
-------------

Configuration is stored in `config/auth_enc_file.ini` and uses the INI style formatting.

Example:

```
[users]
user@domain.com={SHA512-CRYPT}$6$...
```
[npm-img]: https://nodei.co/npm/haraka-plugin-auth-enc-file.png
[npm-url]: https://www.npmjs.com/package/haraka-plugin-auth-enc-file
