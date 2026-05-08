
// student management functions

 function handleStudentSubmit(e) {
     e.preventDefault();

     let roll = document.getElementById('studentRoll').value.trim();
     // Check for duplicate roll number
     if (allStudents.some(s => s.roll === roll)) {
         alert('Error: Roll number already exists!');
         return;
     }

     let student = {
         id: Date.now(),
         name: document.getElementById('studentFullName').value,
         studentClass: document.getElementById('studentClass').value,
         roll: roll,
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
            <th>Roll</th><th>Name</th><th>Class</th><th>Section</th><th>Action</th> </tr></thead><tbody>`;
    
    let today = new Date().toISOString().split('T')[0];
    
    for(let i = 0; i < allStudents.length; i++) {
        let oneRecord = allStudents[i];
        let bgColor = '#c6f6d5';
        let attendanceRecord = allAttendance.find(r => r.studentId === oneRecord.id && r.date === today);
        
        if(attendanceRecord) {
            if(attendanceRecord.status === 'Absent') bgColor = '#fed7d7';
            if(attendanceRecord.status === 'Late') bgColor = '#feebc8';
        }
        html += `<tr style="background-color: ${bgColor}">
             <td>${oneRecord.roll}</td>
             <td>${oneRecord.name}</td>
             <td>${oneRecord.studentClass}</td>
             <td>${oneRecord.section}</td>
              <td><button onclick="deleteStudent(${i})" class="delete-btn">Delete</button></td>
         </tr>`;
    }

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

    let today = new Date().toISOString().split('T')[0];
    
    filtered.forEach((s, i) => {
        let bgColor = '#c6f6d5';
        let attendanceRecord = allAttendance.find(r => r.studentId === s.id && r.date === today);
        if(attendanceRecord) {
            if(attendanceRecord.status === 'Absent') bgColor = '#fed7d7';
            if(attendanceRecord.status === 'Late') bgColor = '#feebc8';
        }
         html += `
         <tr style="background-color: ${bgColor}">
             <td>${s.roll}</td>
             <td>${s.name}</td>
             <td>${s.studentClass}</td>
             <td>${s.section}</td>
             <td><button onclick="deleteStudent(${allStudents.indexOf(s)})" class="delete-btn">Delete</button></td>
         </tr>`;
    });
    html += "</tbody></table>";
    container.innerHTML = html;
}
 function deleteStudent(index) {
     if (confirm("Delete student?")) {
         let student = allStudents[index];
         // Remove student's attendance records
         allAttendance = allAttendance.filter(a => a.studentId !== student.id);
         // Remove student
         allStudents.splice(index, 1);
         saveData();
         displayStudentsList();
         updateDashboard();
     }
 }