// ===============================
// STORAGE LAYER (LocalStorage)
// ===============================

let allStudents = [];
let allAttendance = [];
let systemUsers = [
    { username: 'admin', password: 'admin123' }
];
let currentUser = null;

// Load saved data from browser storage
function loadData() {
    let savedStudents = localStorage.getItem('class_students');
    let savedAttendance = localStorage.getItem('class_attendance');

    if (savedStudents) allStudents = JSON.parse(savedStudents);
    if (savedAttendance) allAttendance = JSON.parse(savedAttendance);
}

// Save data to browser storage
function saveData() {
    localStorage.setItem('class_students', JSON.stringify(allStudents));
    localStorage.setItem('class_attendance', JSON.stringify(allAttendance));
}