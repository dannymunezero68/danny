
// STUDENT MANAGEMENT

function handleStudentSubmit(e) {
    e.preventDefault();

    let student = {
        id: Date.now(),
        name: document.getElementById('studentFullName').value,
        class: document.getElementById('studentClass').value,
        roll: document.getElementById('studentRoll').value,
        section: document.getElementById('studentSection').value
    };

    allStudents.push(student);
    saveData();

    e.target.reset();

    displayStudentsList();
    updateDashboard();

    alert('Student added successfully');
}

function displayStudentsList() {
    let container = document.getElementById('studentsTable');
    if (!container) return;

    if (allStudents.length === 0) {
        container.innerHTML = "<p>No students found</p>";
        return;
    }

    let html = `<table><thead>
        <tr>
            <th>Roll</th><th>Name</th><th>Class</th><th>Section</th><th>Action</th>
        </tr>
    </thead><tbody>`;

    allStudents.forEach((s, i) => {
        html += `
        <tr>
            <td>${s.roll}</td>
            <td>${s.name}</td>
            <td>${s.class}</td>
            <td>${s.section}</td>
            <td><button onclick="deleteStudent(${i})">Delete</button></td>
        </tr>`;
    });
    html += "</tbody></table>";
    container.innerHTML = html;
}

function searchStudents() {
    let query = document.getElementById('searchStudent').value.toLowerCase();
    let container = document.getElementById('studentsTable');
    if (!container) return;

    let filtered = allStudents.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.roll.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        container.innerHTML = "<p>No matching students found</p>";
        return;
    }

    let html = `<table><thead>
        <tr>
            <th>Roll</th><th>Name</th><th>Class</th><th>Section</th><th>Action</th>
        </tr>
    </thead><tbody>`;

    filtered.forEach((s, i) => {
        html += `
        <tr>
            <td>${s.roll}</td>
            <td>${s.name}</td>
            <td>${s.class}</td>
            <td>${s.section}</td>
            <td><button onclick="deleteStudent(${allStudents.indexOf(s)})">Delete</button></td>
        </tr>`;
    });
    html += "</tbody></table>";
    container.innerHTML = html;
}
function deleteStudent(index) {
    if (confirm("Delete student?")) {
        allStudents.splice(index, 1);
        saveData();
        displayStudentsList();
        updateDashboard();
    }
}