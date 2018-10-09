const {sha512crypt} = require('sha512crypt-node');

exports.hook_capabilities = (next, connection) => {
  // Don't offer AUTH capabilities by default unless session is encrypted
  if (connection.tls.enabled) {
    const methods = ['PLAIN', 'LOGIN'];
    connection.capabilities.push(`AUTH ${methods.join(' ')}`);
    connection.notes.allowed_auth_methods = methods;
  }
  next();
}

exports.register = () => {
  this.inherits('auth/auth_base');
  this.load_auth_enc_file_ini();
}

exports.load_auth_enc_file_ini = () => {
  this.cfg = this.config.get('auth_enc_file.ini', this.load_auth_enc_file_ini);
}

exports.check_plain_passwd = (connection, user, passwd, cb) => {
  if (this.cfg.users[user]) {
    const [method, id, salt, hash] = this.cfg.users[user].split('$');
    return cb(sha512crypt(passwd, salt) === `$${id}$${salt}$${hash}`);
  }
  return cb(false);
}
