var express = require('express');
var router = express.Router();
var ldap = require('ldapjs');
// ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with the auth resource');
});

//authentication by ldap
// LDAP_HOST = '10.200.200.23'
// LDAP_BASE_DN = 'OU=gridsum-members,DC=gridsum,DC=com'
// LDAP_DOMAIN = 'gridsum.com'
router.get('/ldap', function(req, res) {
    var client = ldap.createClient({
        url: 'ldap://10.200.200.23:389/OU=gridsum-members,DC=gridsum,DC=com'
    });

    client.compare('OU=gridsum-members,DC=gridsum,DC=com', 'mail', 'zhangbiaoguang@gridsum.com', function(err, matched) {
        console.log(err);
        console.log('matched: ' + matched);
        res.send(matched);
    });
});

module.exports = router;
