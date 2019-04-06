//localhost:3000/app.js

window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            append_json(JSON.parse(xhr.response));
        }
    };
    xhr.open('GET', '/students/', true);
    xhr.send(null);



};

function append_json(studentsArray) {
    let table = document.getElementById('table-id');

    for (let i = 1; i < table.rows.length; i++) {
        table.deleteRow(i);
    }


    studentsArray.forEach(function (student) {

        // var tr = document.createElement('tr');
        // tr.innerHTML = '<td>' + student._id + '</td>' +
        //     '<td>' + student.firstName + '</td>' +
        //     '<td>' + student.lastName + '</td>' +
        //     '<td>' + student.major + '</td>' +
        //     '<td>' + student.receivedDate + '</td>';
        //
        // tbody.appendChild(tr);

        let row = table.insertRow(table.rows.length);
        row.insertCell(0).innerText = student._id;
        row.insertCell(1).innerText = student.firstName;
        row.insertCell(2).innerText = student.lastName;
        row.insertCell(3).innerText = student.major;
        row.insertCell(4).innerText = student.receivedDate;
        row.insertCell(5).innerHTML = '<a href=/profiles/'+student._id+'>'+"Profile"+'</a>';
    });
    // table.appendChild(tbody);

}
