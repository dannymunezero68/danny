// app initialization
function handleLogin(e) {
    e.preventDefault();
    let user = document.getElementById('loginUser').value;
    let pass = document.getElementById('loginPass').value;

    let valid = systemUsers.find(u => u.username === user && u.password === pass);
    if (valid) {
        currentUser = valid.username;
        let loggedUserElement = document.getElementById('loggedUser');
        if (loggedUserElement) {
            loggedUserElement.innerText = currentUser;
        }
        let loginScreen = document.getElementById('loginScreen');
        let mainSystem = document.getElementById('mainSystem');
        if (loginScreen) loginScreen.classList.add('hidden');
        if (mainSystem) mainSystem.classList.remove('hidden');
        let loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.reset();
        updateDashboard();
    } else {
        alert('Invalid credentials!');
    }
}
function init() {
    loadData();
    let loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    let addStudentForm = document.getElementById('addStudentForm');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', handleStudentSubmit);
    }

    // Set default date to today
    let today = new Date().toISOString().split('T')[0];
    let attendanceDate = document.getElementById('attendanceDate');
    if (attendanceDate) attendanceDate.value = today;

    let loginScreen = document.getElementById('loginScreen');
    let mainSystem = document.getElementById('mainSystem');
    if (loginScreen) loginScreen.classList.remove('hidden');
    if (mainSystem) mainSystem.classList.add('hidden');
}
init();

// logout function
function doLogout() {
    let mainSystem = document.getElementById("mainSystem");
    let loginScreen = document.getElementById("loginScreen");
    if (mainSystem) mainSystem.classList.add("hidden");
    if (loginScreen) loginScreen.classList.remove("hidden");
}
let mainHeader = document.getElementById("mainHeader");
if (mainHeader) mainHeader.style.display = "block";