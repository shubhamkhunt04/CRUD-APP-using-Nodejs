let token = localStorage.getItem("token")

let base64Url = token.split('.')[1];
let base64 = base64Url.replace('-', '+').replace('_', '/');
let jwtpayload = JSON.parse(window.atob(base64));
let userId = jwtpayload._id;

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
        // console.log(json);
        localStorage.setItem('userdata', JSON.stringify(json));

        html = `
        <div class="container w-50 text-center">
        <table class="table table-striped">
                <tr>
                    <th scope="col">Username</th>
                    <td>${json.username}</td>
                </tr>
                <tr>
                    <th scope="col">Email</th>
                    <td>${json.email}</td>
                </tr>
                <tr>
                    <th scope="col">Mobile Number</th>
                    <td>${json.mobile}</td>
                </tr>
        </table>
        </div>
        `
        document.getElementById('userinfo').innerHTML = html;
    })

    .catch((err) => {
        console.log("Error occure",err);
        document.getElementById('userinfo').innerHTML = `
        <div class="alert alert-danger" role="alert">
         Somthing Went Wrong !!
        </div>
        `;

    });

// ******************************Now code for Edit User Info*******************************

// Now if Button Cliked then fire the Function.

window.addEventListener('load', (e) => {
    document.getElementById('edit').addEventListener('click', (e) => {
        let userdata = localStorage.getItem('userdata');
        let data = JSON.parse(userdata);

        html = `
        <!-- Modal -->
        <div class="modal fade" id="editBtn" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Update Information</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
    
                        <form method="POST">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" id="username" autocomplete="off" value="${data.username}">
                                <div id="userError"></div>
    
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" class="form-control" id="email" autocomplete="off" value="${data.email}">
                                <div id="emailError"></div>
                            </div>
                            <div class="form-group">
                                <label for="mobile">Mobile Number</label>
                                <input type="number" class="form-control" id="mobile" autocomplete="off" value="${data.mobile}">
                                <div id="mobileError"></div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="update">Update</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        
        `
        document.getElementById('editmodal').innerHTML = html;



        // now if user click on update then updating the data into database
        document.getElementById('update').addEventListener('click', (e) => {

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
                    document.getElementById('editdeleteAlert').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    Update SuccessFully !
                    </div>
                    `
                    setTimeout(() => {
                        location = "../userdashbord.html";
                    }, 1000);
                })
        })

    });



    // ******************************Now code for DELETE User Account*******************************



    document.getElementById('delete').addEventListener('click', (e) => {
        let confirmAlert = confirm("You want to Delete your Account");
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
                    document.getElementById('editdeleteAlert').innerHTML = `
                    <div class="alert alert-success" role="alert">
                    Delete SuccessFully !
                    </div>
                    `
                    setTimeout(() => {
                        location = "../index.html";
                    }, 2000);
                })
        }
    });
});