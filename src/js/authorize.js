import {auth} from "./firebase.js";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";

export function Authorize(){

    //Signup

    const registerUser = async(fullname,email,password)=>{

        const defaultprofileing = "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-13.jpg";

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            // console.log(user);

            await updateProfile(user, {
                displayName: fullname,
                photoURL: defaultprofileing,
              }).then(() => {

            //Redirect to index.html 
            window.location.href = "../index.html";
              });

        }catch(err){
            console.error("error registering users: ",err);

        }



    }

    //signin 
    const loginUser = (email,password)=>{

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // console.log(userCredential.user);

            // setname to localstorage
            setLocalName(userCredential.user);
            window.location.href = "../index.html";

       })
        .catch((error) => {
            console.error("error registering users: ",error.message);
     });

    }


    //signout
    const logoutUser = ()=>{

        signOut(auth)
            .then(() => {
                //unset name form localstorage
                unsetLocalName();
                window.location.href="../signin.html";
           }).catch((error) => {
            console.error("error logging out =" ,error.message);
        });

    }

    //reset password 
    const resetPassword = async(email,msg)=>{

        try{

            await sendPasswordResetEmail(auth, email)

            msg.textContent = "Password reset email send. Please check your inbox"
            msg.style.color = "green";
            msg.style.fontSize = "11pz";

        }catch{
            console.error("error sending password reset email =" ,error.message);

            msg.textContent = `Error :${error.message}`;
            msg.style.color = "red";
            msg.style.fontSize = "11pz";

        }

    }

    //google signin 

    const googleLogin = ()=>{

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {

            // console.log(result.displayName);
            setLocalName(result.user.displayName);

            window.location.href = "../index.html";


    }).catch((error) => {
        console.error("error with google signin =" ,error.message);
   
    });

    }

    //auth check 
    const isLooggedIn = ()=>{

    onAuthStateChanged(auth, (userdata) => {
        if (userdata) {
            return true;

        } else {
            window.location.href = "../signin.html";

        }
    });

    }

    //get user info 
    const getUser = (callback)=>{

        // callback("hello sir");

        onAuthStateChanged(auth,(userdata)=>{
            if(userdata){
                callback(userdata);
            }
        });
    }

    const setLocalName = (userdata)=>{
        localStorage.setItem('username',userdata.displayName);
    }

    const unsetLocalName = ()=>{
        localStorage.removeItem('username');
    }

    return {registerUser,loginUser,logoutUser,resetPassword,googleLogin,isLooggedIn,getUser}
}