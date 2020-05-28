console.log("Login page");
console.log("linked successfully");

document.getElementById('loginBtn').addEventListener('click', (e) => {

    // lusername means LoginUsername
    let lusername = document.getElementById('lusername').value;
    let lpassword = document.getElementById('lpassword').value;

    let url = "http://localhost:3000/users/login";

    let data = {
        "username": lusername,
        "password": lpassword
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
                location = "../userdashbord.html";
                localStorage.setItem('token', json.token);
            }
        })
        .catch((err) => {
            document.getElementById('loginAlert').innerHTML = `
<div class="alert alert-danger" role="alert">
    Login Failed Wrong Username And Password!
</div>
`
        });
    // set all field blank after sending form to the server.
    lusername = "";
    lpassword = "";

    // set successfull alert message.
    document.getElementById('loginAlert').innerHTML = `
     <div class="alert alert-success" role="alert">
         Login Successfully!
     </div>
     `
})