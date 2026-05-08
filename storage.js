
//LocalStorage


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

     let migrated = false;
     if (savedStudents) {
         allStudents = JSON.parse(savedStudents);
         // Migrate old 'class' property 
         allStudents = allStudents.map(s => {
             if (s.hasOwnProperty('class') && !s.hasOwnProperty('studentClass')) {
                 const { class: oldClass, ...rest } = s;
                 migrated = true;
                 return { ...rest, studentClass: oldClass };
             }
             return s;
         });
     }
     if (savedAttendance) allAttendance = JSON.parse(savedAttendance);

     // If migration occurred, save cleaned data to storage
     if (migrated) {
         saveData();
     }
 }

// Save data to browser storage
function saveData() {
    localStorage.setItem('class_students', JSON.stringify(allStudents));
    localStorage.setItem('class_attendance', JSON.stringify(allAttendance));
}