
// ATTENDANCE MARKING
function loadAttendanceMarkingForm() {
    let container = document.getElementById('attendanceForm');
    if (!container || allStudents.length === 0) return;

    let today = new Date().toISOString().split('T')[0];

    let html = `<table><thead>
        <tr>
            <th>Roll</th><th>Name</th><th>Status</th>
        </tr>
    </thead><tbody>`;

    allStudents.forEach(student => {
        let record = allAttendance.find(
            r => r.studentId === student.id && r.date === today
        );

        let status = record ? record.status : "";

        html += `
        <tr>
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>
                <label><input type="radio" name="status_${student.id}" value="Present" ${status==="Present"?"checked":""}>Present</label>
                <label><input type="radio" name="status_${student.id}" value="Absent" ${status==="Absent"?"checked":""}>Absent</label>
                <label><input type="radio" name="status_${student.id}" value="Late" ${status==="Late"?"checked":""}>Late</label>
            </td>
        </tr>`;
    });

    html += "</tbody></table>";
    container.innerHTML = html;
}

function saveAttendanceMarking() {
    let date = document.getElementById('attendanceDate').value;

    allAttendance = allAttendance.filter(a => a.date !== date);

    allStudents.forEach(student => {
        let selected = document.querySelector(`input[name="status_${student.id}"]:checked`);

        if (selected) {
            allAttendance.push({
                studentId: student.id,
                studentName: student.name,
                studentRoll: student.roll,
                studentClass: student.studentClass,
                studentSection: student.section,
                date: date,
                status: selected.value
            });
        }
    });

    saveData();
    updateDashboard();
    alert("Attendance saved");
}