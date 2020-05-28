// console.log(document.getElementById('userlogout'));
document.getElementById('userlogout').addEventListener('click', (e) => {
    localStorage.clear();
    sessionStorage.clear();
    location = "../index.html"
})

/*
created by Shubham Khunt

============contact============

Email   :-   shubhamkhunt08@gmail.com
github  :-   https://github.com/shubhamkhunt04
linkdin :-   https://www.linkedin.com/in/shubhamkhunt
*/