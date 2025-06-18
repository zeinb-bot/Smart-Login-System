
document.addEventListener('DOMContentLoaded', function () {
    ////////////sign up//////////////////////////////
    var username = document.querySelector("#username");
    var signupBtn = document.querySelector('#signupBtn');
    var signupNameInput = document.querySelector('#signupName');
    var signupEmailInput = document.querySelector('#signupEmail');
    var signupPasswordInput = document.querySelector('#signupPassword');
    const successMsg = document.querySelector('#sucess');
    //////login//////////////////////////////
    var loginEmail = document.querySelector('#loginEmail');
    var loginPassword = document.querySelector('#loginPassword');
    var loginBtn = document.querySelector('#loginBtn');
    const incorrectMsg = document.querySelector('#incorrect');
    var users = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
    // /////////////////////////////////
    if (loginBtn) {
        loginBtn.addEventListener('click', function () {

           // console.log(users);
            var user =
            {
                userEmail: loginEmail.value,
                userPassword: loginPassword.value
            }
            console.log(user.userEmail, user.userPassword);
            const matchedUser = users.find(user => user.userEmail === loginEmail.value && user.userPassword === loginPassword.value);
             const loginUsers = JSON.parse(localStorage.getItem("loginUsers"))?JSON.parse(localStorage.getItem("loginUsers")):[];
             
            if (matchedUser) {
                incorrectMsg.innerText = "";
                localStorage.setItem("loginUsers", JSON.stringify(matchedUser));
               
                // alert(`Welcome !`);
              console.log(loginUsers);
                window.location.href = "home.html";
                username.innerText =  `Welcome ${loginUsers.userName}`;

            } else {
                incorrectMsg.innerText = "Incorrect email or password.";
                incorrectMsg.style.color = "red";
            }
        });
    }


    if (signupBtn && signupNameInput && signupEmailInput && signupPasswordInput) {

        signupBtn.addEventListener('click', function (e) {
            //    e.preventDefault(); 
            // console.log("Signup");
            //console.log(signupName,validate(signupNameInput));
            var user =
            {
                userName: signupNameInput.value,
                userEmail: signupEmailInput.value,
                userPassword: signupPasswordInput.value

            }
            if (user.userName === "" || user.userEmail === "" || user.userPassword === "") {
                successMsg.innerText = "Please fill in all fields.";
                successMsg.style.color = "red";
                return;
            }
            if (!validate(signupNameInput)) {
                successMsg.innerText = "Invalid user Name (at least 3 lowercase letters)";
                successMsg.style.color = "red";
                return;
            }  
            if (!validate(signupEmailInput)) {
                successMsg.innerText = "Invalid email format.";
                successMsg.style.color = "red";
                return;
            }
            if (!validate(signupPasswordInput)) {
                successMsg.innerText = "Weak password. Must be 8+ chars, include uppercase, lowercase, digit, and symbol.";
                successMsg.style.color = "red";
                return;
            }
          
            const emailExists = users.some(user => user.userEmail === signupEmailInput.value);
            if (emailExists) {
                successMsg.innerText = "Email already exists!";
                successMsg.style.color = "red";
                return;
            } else if (validate(signupNameInput) && validate(signupEmailInput) && validate(signupPasswordInput)) {
                successMsg.innerText = "Sucess";
                successMsg.style.color = "green";
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
                //console.log(users);
               // window.location.href = "login.html";
            }


            //console.log(users.some(useremail => (useremail.user.userEmail)===signupEmailInput.value));

        });
    }


    function validate(element) {
        var regex =
        {
            signupName: /^[a-z]{3,}/,
            signupEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            signupPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        }

        var isValid = regex[element.id].test(element.value);
        return isValid;


    }

    /////////////////////////logout////////////////////////////
   console.log(JSON.parse(localStorage.getItem("loginUsers")));
   if( document.getElementById("logout"))
   {
        const userlogin = JSON.parse(localStorage.getItem("loginUsers"));

            if (userlogin) {
                document.getElementById("username").innerText = `Welcome ${userlogin.userName}`;
            } else {
                
                window.location.href = "login.html";
            }

            // logout function
             document.getElementById("logout").addEventListener("click", function (e) {
               // e.preventDefault();
                localStorage.removeItem("loginUsers");
                console.log( JSON.parse(localStorage.removeItem("loginUsers")));
                //window.location.href = "login.html";
            });
   }


});


