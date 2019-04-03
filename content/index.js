//localhost:3000/app.js

window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.responseText);
            append_json(JSON.parse(xhr.response));
        }
    };
    xhr.open('GET', '/students/', true);
    xhr.send(null);


};

function append_json(studentsArray) {
    var table = document.getElementById('table-id');
    table.innerHTML = '';

    var tbody = document.createElement('tbody');

    studentsArray.forEach(function (student) {

        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + student._id + '</td>' +
            '<td>' + student.firstName + '</td>' +
            '<td>' + student.lastName + '</td>' +
            '<td>' + student.major + '</td>' +
            '<td>' + student.receivedDate + '</td>';

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

}
