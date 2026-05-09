// Storage keys with namespace prefix to avoid collisions on GitHub Pages
// All sites on username.github.io share the same localStorage
const STORAGE_PREFIX = 'attendance_sys_';

// LocalStorage keys
const KEY_STUDENTS = STORAGE_PREFIX + 'students';
const KEY_ATTENDANCE = STORAGE_PREFIX + 'attendance';

let allStudents = [];
let allAttendance = [];
let systemUsers = [
    { username: 'admin', password: 'admin123' }
];
let currentUser = null;

// Load saved data from browser storage
function loadData() {
    try {
        let savedStudents = localStorage.getItem(KEY_STUDENTS);
        let savedAttendance = localStorage.getItem(KEY_ATTENDANCE);

        // Migrate from old unprefixed keys if new keys are empty (first run after update)
        if (!savedStudents && !savedAttendance) {
            const oldStudents = localStorage.getItem('class_students');
            const oldAttendance = localStorage.getItem('class_attendance');

            if (oldStudents) {
                savedStudents = oldStudents;
                // Remove old key after migration to avoid confusion
                localStorage.removeItem('class_students');
            }
            if (oldAttendance) {
                savedAttendance = oldAttendance;
                localStorage.removeItem('class_attendance');
            }
        }

        let migrated = false;
        if (savedStudents) {
            allStudents = JSON.parse(savedStudents);
            // Migrate old 'class' property to 'studentClass'
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

        // If migration occurred, save cleaned data to storage with new keys
        if (migrated) {
            saveData();
        }
    } catch (e) {
        console.error('Error loading data from localStorage:', e);
        // localStorage might be disabled or full
        allStudents = [];
        allAttendance = [];
    }
}

// Save data to browser storage
function saveData() {
    try {
        localStorage.setItem(KEY_STUDENTS, JSON.stringify(allStudents));
        localStorage.setItem(KEY_ATTENDANCE, JSON.stringify(allAttendance));
    } catch (e) {
        console.error('Error saving data to localStorage:', e);
        alert('Unable to save data. localStorage might be full or disabled.');
    }
}