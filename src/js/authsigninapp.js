import "@fortawesome/fontawesome-free/css/all.min.css"; 

import {Authorize} from "./authorize.js";

//UI 

const signupform = document.getElementById('singinform');
const googleloginbtn = document.getElementById('googleloginbtn');

//Register 
// console.log('hello');

signupform.addEventListener('submit',(e)=>{
    e.preventDefault();

    const siginemail = document.getElementById('signinemail').value.trim();
    const siginpassword = document.getElementById('signinpassword').value.trim();

    // console.log(fullname,email,password);

    const {loginUser} = Authorize();
    loginUser(siginemail,siginpassword);


});

//googlelogin 

googleloginbtn.addEventListener('click',()=>{


    const {googleLogin} = Authorize();
    googleLogin();


});