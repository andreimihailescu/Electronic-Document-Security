var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var fs = require("fs");

var contor = 1;

router.post('/tdes', function (req, res) {

    // console.log('IMAGINE CRIPTAT: ' + req.body.message);

    var secretKey = 'Ne place criptografia';
    var message = req.body.message;
    var decrypted = CryptoJS.TripleDES.decrypt(message, secretKey).toString(CryptoJS.enc.Utf8);
    var base64Data = decrypted.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile("../public/download/imagineCriptata" + contor + ".txt", message, function (err) {
       //console.log(err);
    });

    fs.writeFile("../public/download/imagineBase" + contor + ".txt", decrypted, function (err) {
        //console.log(err);
    });

    fs.writeFile("../public/download/imagine" + contor + ".jpg", base64Data, 'base64', function (err) {
       //console.log(err);
    });

    contor += 1;

    //  console.log('IMAGINE DECRIPTAT: ' + decrypted);

    res.send(JSON.stringify('Image uploaded.'));

});

module.exports = router;