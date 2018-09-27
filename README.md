[![Build Status][ci-img]][ci-url]
[![Windows Build Status][ci-win-img]][ci-win-url]
[![Code Climate][clim-img]][clim-url]
[![Greenkeeper badge][gk-img]][gk-url]
[![NPM][npm-img]][npm-url]

# haraka-plugin-auth-ldap

The `auth/auth_ldap` plugin uses an LDAP bind to authenticate a user. Currently
only one server and multiple DNs can be configured. If any of the DN binds succeed, the user is authenticated.

Configuration
-------------

Configuration is stored in `config/auth_ldap.ini` and uses the INI
style formatting.

`PLAIN` and `LOGIN` authentication methods are supported assuming that passwords in the LDAP database are not stored in cleartext (which would allow for CRAM-MD5). Note that this means passwords will be sent in the clear to the LDAP server unless an `ldaps://` conection is used.

Current configuration options in `[core]` are:

    server - the url of the LDAP server (ldap:// or ldaps://)
    timeout - time in miliseconds to wait for the server resonse before giving up
    rejectUnauthorized - boolean (true or false) as to whether to reject connections
        not verified against a CA. Meaning, a "false" allows non-verified.

Example:

    [core]
    server=ldaps://ldap.opoet.com
    timeout=5000
    rejectUnauthorized=false

The `[dns]` section (that is plural DN and not domain name system), is a list of DNs to use
to bind. The `%u` in the strings is substituted with the user name used in the SMTP authentication. Note that the keys have no meaning and the DNs are tried in series until
the first successful bind. The LDAP RFC does not allow for parallel binds on a connection,
so it is suggested that the most commonly used DN be placed earlier in the list.

Example:

    [dns]
    dn1=uid=%u,ou=Users,dc=opoet,dc=com
    dn2=uid=%u,ou=people,dc=opoet,dc=com


<!-- leave these buried at the bottom of the document -->
[ci-img]: https://travis-ci.org/haraka/haraka-plugin-auth-ldap.svg
[ci-url]: https://travis-ci.org/haraka/haraka-plugin-auth-ldap
[ci-win-img]: https://ci.appveyor.com/api/projects/status/6m1g2de9s9s3bnij?svg=true
[ci-win-url]: https://ci.appveyor.com/project/msimerson/haraka-plugin-auth-ldap
[cov-img]: https://codecov.io/github/haraka/haraka-plugin-auth-ldap/coverage.svg
[cov-url]: https://codecov.io/github/haraka/haraka-plugin-auth-ldap
[clim-img]: https://codeclimate.com/github/haraka/haraka-plugin-auth-ldap/badges/gpa.svg
[clim-url]: https://codeclimate.com/github/haraka/haraka-plugin-auth-ldap
[gk-img]: https://badges.greenkeeper.io/haraka/haraka-plugin-auth-ldap.svg
[gk-url]: https://greenkeeper.io/
[npm-img]: https://nodei.co/npm/haraka-plugin-auth-ldap.png
[npm-url]: https://www.npmjs.com/package/haraka-plugin-auth-ldap
