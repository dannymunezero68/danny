// dashboard update function

function updateDashboard(){

    let today = new Date().toISOString().split("T")[0];

    let todayAttendance = allAttendance.filter(
        item => item.date === today
    );

    let present = todayAttendance.filter(
        item => item.status === "Present"
    ).length;

    let absent = todayAttendance.filter(
        item => item.status === "Absent"
    ).length;

    let late = todayAttendance.filter(
        item => item.status === "Late"
    ).length;

    let totalStudents = allStudents.length;

    // update dashbord

    document.getElementById("presentToday").innerText = present;

    document.getElementById("absentToday").innerText = absent;

    document.getElementById("lateToday").innerText = late;

    document.getElementById("totalStudents").innerText = totalStudents;

    // attendence rate

    let rate = totalStudents > 0
        ? Math.round((present / totalStudents) * 100)
        : 0;

    document.getElementById("attendanceRate").innerText = rate + "%";

    // animation - safely handle missing element
    let progressFill = document.getElementById("progressFill");
    if (progressFill) {
        progressFill.style.width = rate + "%";
    }
}