const hasher = require('sha512crypt-node');

exports.hook_capabilities = function (next, connection) {
  // Don't offer AUTH capabilities by default unless session is encrypted
  if (connection.tls.enabled) {
    const methods = [ 'PLAIN', 'LOGIN' ];
    connection.capabilities.push('AUTH ' + methods.join(' '));
    connection.notes.allowed_auth_methods = methods;
  }
  next();
}

exports.register = function () {
  this.inherits('auth/auth_base');
  this.load_auth_enc_file_ini();
}

exports.load_auth_enc_file_ini = function () {
  const plugin = this;
  plugin.cfg = plugin.config.get('auth_enc_file.ini', function () {
    plugin.load_auth_enc_file_ini();
  });
}

exports.check_plain_passwd = function (connection, user, passwd, cb) {
  const plugin = this;
  if (plugin.cfg.users[user]) {
    const [method, id, salt, hash] = plugin.cfg.users[user].split('$');
    return cb(hasher.sha512crypt(passwd, salt) === `$${id}$${salt}$${hash}`);
  }
  return cb(false);
}
