// ===============================
// UI CONTROLLER (Panels Navigation)
// ===============================

function showPanel(panelName) {
    let panels = ['dashboardPanel', 'studentsPanel', 'attendancePanel', 'reportsPanel', 'aboutPanel'];

    panels.forEach(id => {
        let el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    let selected = document.getElementById(panelName + 'Panel');
    if (selected) selected.classList.remove('hidden');

    if (panelName === 'dashboard') updateDashboard();
    if (panelName === 'students') displayStudentsList();
    if (panelName === 'attendance') loadAttendanceMarkingForm();
    if (panelName === 'reports') displayAllReports();
}

function loadPage(pageName) {
    let panels = ['dashboardPanel', 'studentsPanel', 'attendancePanel', 'reportsPanel'];

    panels.forEach(id => {
        let el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    let selected = document.getElementById(pageName + 'Panel');
    if (selected) selected.classList.remove('hidden');

    if (pageName === 'dashboard') updateDashboard();
    if (pageName === 'students') displayStudentsList();
    if (pageName === 'attendance') loadAttendanceMarkingForm();
    if (pageName === 'reports') displayAllReports();
}

function initStandalone() {
    loadData();
    let today = new Date().toISOString().split('T')[0];
    let attendanceDate = document.getElementById('attendanceDate');
    if (attendanceDate) attendanceDate.value = today;

    if (document.getElementById('studentsPanel')) displayStudentsList();
    if (document.getElementById('dashboardPanel')) updateDashboard();
    if (document.getElementById('attendancePanel')) loadAttendanceMarkingForm();
    if (document.getElementById('reportsPanel')) displayAllReports();
}

