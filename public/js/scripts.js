document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const menuToggle = document.getElementById("menuToggle");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const loginContainer = document.getElementById("login");
    const registerContainer = document.getElementById("register");
 

    // Initialize the forms - show register by default
    showRegister();

    // Function to toggle the navigation menu
    function myMenuFunction() {
        const navMenu = document.getElementById("navMenu");
        
        if (navMenu.className === "nav-menu") {
            navMenu.className += " responsive";
        } else {
            navMenu.className = "nav-menu";
        } 
    }

    // Function to show login form
    function showLogin() {
        if (loginContainer && registerContainer) {
            // Show login container with fade
            loginContainer.style.display = "flex";
            loginContainer.style.opacity = "0";
            setTimeout(() => {
                loginContainer.style.opacity = "1";
            }, 50);
            
            // Hide register container
            registerContainer.style.opacity = "0";
            setTimeout(() => {
                registerContainer.style.display = "none";
            }, 300);

            // Update button styles
            loginBtn.classList.add("white-btn");
            registerBtn.classList.remove("white-btn");
        }
    }

    // Function to show register form
    function showRegister() {
        if (loginContainer && registerContainer) {
            // Hide login container
            loginContainer.style.opacity = "0";
            setTimeout(() => {
                loginContainer.style.display = "none";
            }, 300);
            
            // Show register container with fade
            registerContainer.style.display = "flex";
            registerContainer.style.opacity = "0";
            setTimeout(() => {
                registerContainer.style.opacity = "1";
            }, 50);

            // Update button styles
            loginBtn.classList.remove("white-btn");
            registerBtn.classList.add("white-btn");
        }
    }


    if (menuToggle) {
        menuToggle.addEventListener("click", myMenuFunction);
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", showLogin);
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", showRegister);
    }
});