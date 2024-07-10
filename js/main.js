"use strict";

// Function to get an element by ID and ensure it exists
function getElement(id) {
  return document.getElementById(id);
}

// All inputs
var signUpName = getElement("signUpName");
var signUpEmail = getElement("signUpEmail");
var signUpPassword = getElement("signUpPassword");
var signInEmail = getElement("signInEmail");
var signInPassword = getElement("signInPassword");

// To get base URL (localhost)
var pathParts = location.pathname.split("/");
var baseURL = "";
for (var i = 0; i < pathParts.length - 1; i++) {
  baseURL += "/" + pathParts[i];
}
console.log("Base URL:", baseURL);

// To say welcome on the home page
var userName = localStorage.getItem("sessionUsername");
if (userName) {
  var userNameElement = getElement("userName");
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
  return (
    signUpName &&
    signUpEmail &&
    signUpPassword &&
    signUpName.value !== "" &&
    signUpEmail.value !== "" &&
    signUpPassword.value !== ""
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
    getElement("Exist").innerHTML =
      '<span class="text-danger m-3">All Inputs Are Required</span>';
    return false;
  }

  if (isEmailExist()) {
    getElement("Exist").innerHTML =
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
  getElement("Exist").innerHTML =
    '<span class="text-success m-3">Success</span>';
  return true;
}

// Check if login inputs are empty
function isLoginEmpty() {
  return (
    signInEmail &&
    signInPassword &&
    signInEmail.value !== "" &&
    signInPassword.value !== ""
  );
}

// Log in function
function logIn() {
  if (!isLoginEmpty()) {
    getElement("wrong").innerHTML =
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
      location.replace("https://bassamosama.github.io/Login/home.html");
      return;
    }
  }

  getElement("wrong").innerHTML =
    '<span class="p-2 text-danger">Incorrect Email Or Password</span>';
}

// Log out function
function logOut() {
  localStorage.removeItem("sessionUsername");
}
