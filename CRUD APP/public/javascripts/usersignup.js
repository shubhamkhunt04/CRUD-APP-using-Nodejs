console.log("linked successfully");

document.getElementById('ssignup').addEventListener('click', (e) => {

    // susername means signupUsername
    let susername = document.getElementById('username').value;
    let semail = document.getElementById('email').value;
    let smobile = document.getElementById('mobile').value;
    let spassword = document.getElementById('password').value;
    let scpassword = document.getElementById('cpassword').value;


    // Form Validation Function call
    let userValidationflages = userValidate(susername); // Here I set flage for validaion.
    let emailValidationflages = emailValidate(semail);
    let mobileValidationflages = mobileValidate(smobile)
    let passwordValidationflages = passwordValidate(spassword, scpassword);


    // If all the flage is true then Registration API is called(hit).

    if (userValidationflages == true && emailValidationflages == true && mobileValidationflages == true && passwordValidationflages == true) {
        let url = "http://localhost:3000/users/signup"
        let data = {

            "username": susername,
            "password": spassword,
            "email": semail,
            "mobile": smobile,
        }

        let params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        fetch(url, params)
            .then((res) => {
                return res.json();
            })

            .then((json) => {
                // console.log(json);
                if (json.success == true) {
                    location = "../login.html"
                } else {
                    document.getElementById('registrationAlert').innerHTML = `
    <div class="alert alert-danger" role="alert">
            Username Already Exists
    </div>
    `
                }

            })

            .catch((err) => {
                console.log("Error occure")
                document.getElementById('registrationAlert').innerHTML = `
    <div class="alert alert-danger" role="alert">
        Registration Failed!
    </div>
    `
                setTimeout(() => { //  After 5 second the alert message remove.
                    document.getElementById('registrationAlert').innerHTML = "";
                }, 5000);
            });

        // set all field blank after sending form to the server.
        susername = "";
        spassword = "";
        semail = "";
        smobile = "";

        // set successfull alert message.
        document.getElementById('registrationAlert').innerHTML = `
    <div class="alert alert-success" role="alert">
        Registration Successfully!
    </div>
    `
    }

    function userValidate(username) {
        let userflag = false; // By defult userflage is false.
        if (username == "" || username == null) {
            let errorMessage = `
    <div class="alert alert-danger" role="alert">
    Please Enter Username
    </div>
    `
            document.getElementById('userError').innerHTML = errorMessage;
            // After five second the message is romoved
            setTimeout(() => {
                document.getElementById('userError').innerHTML = "";
            }, 5000);
            return userflag;
        } else // if not any misstake in username so set userflage true and return.
        {
            userflag = true;
        }
        return userflag;
    }

    function emailValidate(email) {
        // for Checking Email is valid or not
        let emailflage = false;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (email == "" || email == null) {
            let errorMessage = `
                    <div class="alert alert-danger" role="alert">
                    Please Enter Email id
                    </div>`

            document.getElementById('emailError').innerHTML = errorMessage;
            // After five second the message is romoved
            setTimeout(() => {
                document.getElementById('emailError').innerHTML = "";
            }, 5000);

        } else if (reg.test(email) == false) {
            let errorMessage = `
                    <div class="alert alert-danger" role="alert">
                    Please Enter Valid Email-id
                    </div>`
            document.getElementById('emailError').innerHTML = errorMessage;
            setTimeout(() => {
                document.getElementById('emailError').innerHTML = "";
            }, 5000);
        } else { // If not any misstack in email ,set email flage true.
            emailflage = true;
        }
        return emailflage;
    }


    function mobileValidate(mobile) {
        let mobileflage = false;
        if (mobile == "" || mobile == null) {
            let errorMessage = `
    <div class="alert alert-danger" role="alert">
    Please Enter Your Mobile Number
    </div>
    `
            document.getElementById('mobileError').innerHTML = errorMessage;
            // After five second the message is romoved
            setTimeout(() => {
                document.getElementById('mobileError').innerHTML = "";
            }, 5000);
        } else if (mobile.length != 10) {
            let errorMessage = `
                    <div class="alert alert-danger" role="alert">
                    Please Enter Valid Mobile Number(10-digit)
                    </div>`
            document.getElementById('mobileError').innerHTML = errorMessage;
            setTimeout(() => {
                document.getElementById('mobileError').innerHTML = "";
            }, 5000);
        } else // If not any misstack in mobile number,set it true;
        {
            mobileflage = true;
        }
        return mobileflage;
    }

    function passwordValidate(password, cpassword) {
        let passwordflage = false;
        if (password == "" || password == null) {
            let errorMessage = `
    <div class="alert alert-danger" role="alert">
    Please Enter Your Password
    </div>
    `
            document.getElementById('passwordError').innerHTML = errorMessage;
            // After five second the message is romoved
            setTimeout(() => {
                document.getElementById('passwordError').innerHTML = "";
            }, 5000);
        } else if (password.toString().length < 8) { // converting number into string and then check length.
            let errorMessage = `
    <div class="alert alert-danger" role="alert">
    Password Length Atleast 8 Character
    </div>
    `
            document.getElementById('passwordError').innerHTML = errorMessage;
            // After five second the message is romoved
            setTimeout(() => {
                document.getElementById('passwordError').innerHTML = "";
            }, 5000);
        } else if (password != cpassword) {
            let errorMessage = `
    <div class="alert alert-danger" role="alert">
    Password And Confirm Password Are Not Matched
    </div>
    `
            document.getElementById('cpasswordError').innerHTML = errorMessage;
            // After five second the message is romoved
            setTimeout(() => {
                document.getElementById('cpasswordError').innerHTML = "";
            }, 5000);
        } else { // if not any misstack in passoword,set passwordflage true.
            passwordflage = true;
        }
        return passwordflage;
    }
})