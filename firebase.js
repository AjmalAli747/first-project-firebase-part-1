window.addEventListener("load", () => {

    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyByfDP1eIwGO9YDVZGaC1H5NfKg2Yqo02w",
    authDomain: "learn-firebase-project-form.firebaseapp.com",
    projectId: "learn-firebase-project-form",
    storageBucket: "learn-firebase-project-form.appspot.com",
    messagingSenderId: "949316530740",
    appId: "1:949316530740:web:f802938604dffc7f4a1061"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//   firebase start

// singup 
const signup = document.getElementById("form2");
const signUpFunction = (e) => {
    e.preventDefault();

    const singUpEmail = document.getElementById("singUpEmail");
    const singUpPassword = document.getElementById("singUpPassword");

    firebase.auth().createUserWithEmailAndPassword(singUpEmail.value, singUpPassword.value)
    .then( (reslut) => {
        const showResult = reslut.user.email;

        reslut.user.updateProfile({
            displayName : "User",
        })

        createUsercollection(reslut.user);
        // alert(`Welcome To Job Protal : ${showResult}`);
        swal("Good job!", `Welcome To Job Protal! ${showResult}`, "success");
    })
    .catch( (error) => {
        swal("error!", `${error.message}`, "error");
    })

}
signup.addEventListener("submit", signUpFunction);

// ********************************** log in ********************************************** 
const logIn = document.getElementById("form1");
const logInFunction = (e) => {
    e.preventDefault();
    
    const logEmail = document.getElementById("logEmail");
    const loginPasword = document.getElementById("loginPasword");

    firebase.auth().signInWithEmailAndPassword(logEmail.value, loginPasword.value)
    .then( (reslut) => {
        const showResult = reslut.user.email;
        // alert(`Welcome To Job Protal : ${showResult}`);
        swal("Good job!", `Welcome To Job Protal! ${showResult}`, "success");
        console.log("Log In Successfuly");
    })
    .catch( (error) => {
        swal("error!", `${error.message}`, "error");
    })

}
logIn.addEventListener("submit", logInFunction);

// ********************************** Log out ********************************************** 
const singout = document.getElementById("signOut");
function singOutFunction(){

    firebase.auth().signOut();

}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
        getUserInfoSanp(user.uid);
    } else {
        console.log("SignOut Successfull");
        getUserInfoSanp(null);
    }
  });

singout.addEventListener("click", singOutFunction);

// ********************************** Google SignUp **********************************************

const googleSignUp = document.getElementById("google");

function googleFunction(){

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result) => {

      console.log(result);
      swal("Google Sign Up!", `Name ${result.user.displayName} and Email ${result.user.email}`, "success");
      console.log(result.user.email);

  }).catch((error) => {

      console.log(error);

  });
}
googleSignUp.addEventListener("click", googleFunction);

// firebase end 

//   end 
})