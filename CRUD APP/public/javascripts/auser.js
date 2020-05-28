let token = localStorage.getItem("token")


let base64Url = token.split('.')[1];
let base64 = base64Url.replace('-', '+').replace('_', '/');
let jwtpayload = JSON.parse(window.atob(base64));
let userId = jwtpayload._id;


let url = "http://localhost:3000/users";

let params = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}
// console.log("now fetch call time");
fetch(url, params)
    .then((res) => {
        return res.json();
    })
    .then((json) => {

        let inedex = 1;
        let html1 = `<!-- table start -->

        <div class="container my-4 table-responsive">
     
         <table class="table table-striped">
             <thead>
                 <tr class="text-danger">
                     <th scope="col">Sr.No.</th>
                     <th scope="col">Username</th>
                     <th scope="col">Email</th>
                     <th scope="col">Mobile No.</th>
                     <th scope="col">Edit</th>
                     <th scope="col">Delete</th>
                 </tr>
             </thead>
             <tbody>
        `;
        let html2 = `` // dynamic content
        let html3 = `  </tbody>
        </table>
    </div>
    <!-- table end -->`;

        json.forEach(element => {
            console.log(element.username);
            html2 += `
                <tr>
                <th scope="row">${inedex}</th>
                <td>${element.username}</td>
                <td>${element.email}</td>
                <td>${element.mobile}</td>
                <td><button type="button" class="btn btn-primary" id="${element._id}" onClick=editUser(this.id)>Edit</button></td>
                <td><button type="button" class="btn btn-danger" id="${element._id}" onClick=deleteUser(this.id)>Delete</button></td>
                </tr>`
            inedex++;
        });
        let html = html1 + html2 + html3
        document.getElementById('userdata').innerHTML = html;
    })
    .catch((err) => console.log("Error occure", err));


//***************************************************** */ Edit user Information By Admin**************************************************************

function editUser(userId) {
    console.log("edit ", userId);

    let url = `http://localhost:3000/users/${userId}`;

    let params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    // console.log("now fetch call time");
    fetch(url, params)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            console.log(json);
            html = `
            
<div class="container w-50 bg-dark text-white p-4 mt-5">
<form method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" autocomplete="off" value="${json.username}">
                <div id="userError"></div>

            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" class="form-control" id="email" autocomplete="off" value="${json.email}">
                <div id="emailError"></div>
            </div>
            <div class="form-group">
                <label for="mobile">Mobile Number</label>
                <input type="number" class="form-control" id="mobile" autocomplete="off" value="${json.mobile}">
                <div id="mobileError"></div>
            </div>
            <div>
              <button type="button" class="btn btn-primary" id="userUpdateByAdmin">Update</button>
            </div>
        </form>
      </div>
            `
            document.getElementById('admineditmodal').innerHTML = html;

            // Now if Userclick on update
            document.getElementById('userUpdateByAdmin').addEventListener('click', (e) => {

                let url = `http://localhost:3000/users/${userId}`;

                // u means Updated
                let uusername = document.getElementById('username').value;
                let uemail = document.getElementById('email').value;
                let umobile = document.getElementById('mobile').value;

                let userdatas = {
                    username: uusername,
                    email: uemail,
                    mobile: umobile
                }
                let params = {
                    method: 'PUT',
                    body: JSON.stringify(userdatas),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }
                // console.log("now fetch call time");
                fetch(url, params)
                    .then((res) => {
                        return res.json();
                    })
                    .then((json) => {
                        // console.log(json);
                        document.getElementById('editDeleteStatusAlert').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    Update SuccessFully !
                    </div>
                    `
                        setTimeout(() => {
                            location = "../auser.html";
                        }, 1000);
                    })
            })
        })

        .catch((err) => {
            console.log("Error occure", err);
            document.getElementById('editDeleteStatusAlert').innerHTML = `
            <div class="alert alert-danger" role="alert">
             Somthing Went Wrong !!
            </div>
            `;

        });

}

//***************************************************** */ Delete user Information By Admin**************************************************************
function deleteUser(userId) {
    console.log("delete ", userId);

    let confirmAlert = confirm("Are You Sure You want to Delete This Account");
    console.log(confirmAlert);
    if (confirmAlert == true) {
        let url = `http://localhost:3000/users/${userId}`;

        let params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        // console.log("now fetch call time");
        fetch(url, params)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                // console.log(json);
                document.getElementById('editDeleteStatusAlert').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    Delete SuccessFully !
                    </div>
                    `
                    location = "../auser.html";
            })
            .catch((err) => {
                console.log("Error occure", err);
                document.getElementById('editDeleteStatusAlert').innerHTML = `
            <div class="alert alert-danger" role="alert">
             Somthing Went Wrong !!
            </div>
            `;

            });
    }
}



/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/