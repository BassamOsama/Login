"use strict";

// var username = localStorage.getItem("sessionUsername");
// if (userName == null) {
//   location.replace("https://" + location.hostname + "/index.html");
// }

// All inputs
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");

// To get base URL (localhost)
var pathParts = location.pathname.split("/");
var baseURL = "";
for (var i = 0; i < pathParts.length - 1; i++) {
  baseURL += "/" + pathParts[i];
}
console.log(baseURL);

// To say welcome in home page
var userName = localStorage.getItem("sessionUsername");
if (userName) {
  var userNameElement = document.getElementById("userName");
  if (userNameElement) {
    userNameElement.innerHTML = "Welcome " + userName;
  }
}

// Initialize signUpArray from localStorage
var signUpArray = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

// Check if sign up inputs are empty
function isEmpty() {
  return !(
    signUpName.value === "" ||
    signUpEmail.value === "" ||
    signUpPassword.value === ""
  );
}

// Check if email already exists in signUpArray
function isEmailExist() {
  return signUpArray.some(
    (user) => user.email.toLowerCase() === signUpEmail.value.toLowerCase()
  );
}

// Sign up function
function signUp() {
  if (!isEmpty()) {
    document.getElementById("Exist").innerHTML =
      '<span class="text-danger m-3">All Inputs Are Required</span>';
    return false;
  }

  if (isEmailExist()) {
    document.getElementById("Exist").innerHTML =
      '<span class="text-danger m-3">Email Already Exists</span>';
    return false;
  }

  // Store all values as an object
  var signUp = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  };

  signUpArray.push(signUp);
  localStorage.setItem("users", JSON.stringify(signUpArray));
  document.getElementById("Exist").innerHTML =
    '<span class="text-success m-3">Success</span>';
  return true;
}

// Check if login inputs are empty
function isLoginEmpty() {
  return !(signInEmail.value === "" || signInPassword.value === "");
}

// Log in function
function logIn() {
  if (!isLoginEmpty()) {
    document.getElementById("wrong").innerHTML =
      '<span class="text-danger m-3">All Inputs Are Required</span>';
    return false;
  }

  var email = signInEmail.value;
  var password = signInPassword.value;

  for (var i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() === email.toLowerCase() &&
      signUpArray[i].password === password
    ) {
      localStorage.setItem("sessionUsername", signUpArray[i].name);
      var redirectURL =
        baseURL === "/"
          ? "https://" + location.hostname + "/home.html"
          : baseURL + "/home.html";
      location.replace(redirectURL);
      return;
    }
  }

  document.getElementById("wrong").innerHTML =
    '<span class="p-2 text-danger">Incorrect Email Or Password</span>';
}

// Log out function
function logOut() {
  localStorage.removeItem("sessionUsername");
}
