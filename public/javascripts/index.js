function readFile() {

    if (this.files && this.files[0]) {
        console.log('THIS: ', this);

        var FR = new FileReader();

        FR.addEventListener("load", function (e) {
            //console.log(e.target.result)
            document.getElementById("poza").src = e.target.result;

            var input = e.target.result;

            var secretKey = 'Ne place criptografia';

            $('#textarea1').text(input);

            var encrypted = CryptoJS.TripleDES.encrypt(input, secretKey).toString();

            $('#textarea2').text(encrypted);

            var data = {
                message: encrypted
            };

            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:8081/api/index/tdes',
                //II FACE PARSE AUTOMAT
                success: function (data) {
                    console.log(data);
                    alert(data);
                }
            });

            //console.log(encrypted);
            //var decrypted = CryptoJS.TripleDES.decrypt(encrypted.toString(), secretKey).toString(CryptoJS.enc.Utf8);
            //console.log(decrypted);
            //document.getElementById("poza").innerHTML = e.target.result;
        });

        FR.readAsDataURL(this.files[0]);
    }
}

document.getElementById("FileUpload").addEventListener("change", readFile);