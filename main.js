// APP INITIALIZATION
function handleLogin(e) {
    e.preventDefault();
    let user = document.getElementById('loginUser').value;
    let pass = document.getElementById('loginPass').value;

    let valid = systemUsers.find(u => u.username === user && u.password === pass);
    if (valid) {
        currentUser = valid.username;
        document.getElementById('loggedUser').innerText = currentUser;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainSystem').classList.remove('hidden');
        document.getElementById('loginForm').reset();
        updateDashboard();
    } else {
        alert('Invalid credentials!');
    }
}
function init() {
    loadData();
    document.getElementById('loginForm')
        ?.addEventListener('submit', handleLogin);

    document.getElementById('addStudentForm')
        ?.addEventListener('submit', handleStudentSubmit);

    // Set default date to today
    let today = new Date().toISOString().split('T')[0];
    let attendanceDate = document.getElementById('attendanceDate');
    if (attendanceDate) attendanceDate.value = today;

    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('mainSystem').classList.add('hidden');
}
init();

// LOGOUT
function doLogout() {
    document.getElementById("mainSystem").classList.add("hidden");
    document.getElementById("loginScreen").classList.remove("hidden");
}