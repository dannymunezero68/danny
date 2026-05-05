// DASHBOARD STATS
function updateDashboard() {
    document.getElementById('totalStudents').innerText = allStudents.length;

    let today = new Date().toISOString().split('T')[0];
    let todayData = allAttendance.filter(a => a.date === today);

    let present = todayData.filter(a => a.status === "Present").length;
    let absent = todayData.filter(a => a.status === "Absent").length;
    let late = todayData.filter(a => a.status === "Late").length;

    document.getElementById('presentToday').innerText = present;
    document.getElementById('absentToday').innerText = absent;
    document.getElementById('lateToday').innerText = late
    // Calculate overall attendance rate
    let totalMarked = present + absent + late;
    let rate = totalMarked > 0 ? Math.round((present / totalMarked) * 100) : 0;
    document.getElementById('attendanceRate').innerText = rate + '%';
}