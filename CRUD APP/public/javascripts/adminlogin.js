let ausername = document.getElementById('ausername');
let apassword = document.getElementById('apassword');


document.getElementById('alogin').addEventListener('click', (e) => {

    // console.log("alogin clicked")
    e.preventDefault();
    let url = "http://localhost:3000/adminlogin/login";

    let data = {
        "username": ausername.value,
        "password": apassword.value
    }
    let params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // console.log("now fetch call time");
    fetch(url, params)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            // console.log(json);
            if (json.success == true) {


                document.getElementById('message').innerHTML = `
                <div class="container">
                <div class="alert alert-success my-3" role="alert">
                Login successfully 
              </div>
              </div>
              `
                location = "../adminpannel.html";
                localStorage.setItem('token', json.token);
            }
        })
        .catch((err) => {
            document.getElementById('message').innerHTML = `
            <div class="container">
            <div class="alert alert-danger my-3" role="alert">
            Authentication Failed 
            </div>
          </div>`
            console.log("authentication failed")
        });

    ausername.value = "";
    apassword.value = "";
})

/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/