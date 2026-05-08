
// reports management


function displayAllReports() {
    let container = document.getElementById('reportsTable');
    if (!container) return;

    document.getElementById('reportDate').value = '';

    renderReportsTable(allAttendance);
}

function filterByDate() {
    let date = document.getElementById('reportDate').value;
    if (!date) {
        alert('Please select a date');
        return;
    }

    let filtered = allAttendance.filter(a => a.date === date);
    renderReportsTable(filtered);
}

function showAllReports() {
    displayAllReports();
}

function searchInReports() {
    let query = document.getElementById('searchReport').value.toLowerCase();
    let filtered = allAttendance.filter(a =>
        a.studentName.toLowerCase().includes(query) ||
        a.studentRoll.toLowerCase().includes(query)
    );
    renderReportsTable(filtered);
}

function renderReportsTable(data) {
    let container = document.getElementById('reportsTable');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = "<p>No attendance records found</p>";
        return;
    }

    let html = `<table><thead>
        <tr>
            <th>Date</th><th>Roll</th><th>Name</th><th>Class</th><th>Section</th><th>Status</th>
        </tr>
    </thead><tbody>`;

    data.forEach(r => {
        html += `
        <tr>
            <td>${r.date}</td>
            <td>${r.studentRoll}</td>
            <td>${r.studentName}</td>
            <td>${r.studentClass}</td>
            <td>${r.studentSection}</td>
            <td><span class="status-badge status-${r.status.toLowerCase()}">${r.status}</span></td>
        </tr>`;
    });

    html += "</tbody></table>";
    container.innerHTML = html;
}

