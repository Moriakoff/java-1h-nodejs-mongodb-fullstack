/*$('#inputForm').validate({
        rules: {
            firstName: {
                required: true,
                minlength: 2,
                maxLength:20
            },
            lastName: {
                required: true,
                minlength: 2,
                maxLength: 20
            },
            birthday: {
                required:true,
                birthday:true
            },
            country: {
                required:true
            },
            city: {
                required:true
            },
            university: {
                required: true
            },
            year: {
                required: true
            }

        }
    });*/


function saveStudent(){
    $(document).ready(function () {
        $("#submit-btn").click(function () {
            const URL = "http://localhost:3000/students/save";

            let studentJson ={
                "firstName": $("#firstName").val(),
                "lastName" : $("#lastName").val(),
                "birthday" : $("#birthday").val(),
                "country" : $("#country").val(),
                "city" : $("#city").val(),
                "university" : $("#university").val(),
                "year" : $("#year").val()
            };

            fetch(URL,{
                method:'POST',
                headers:{'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentJson)
            }).then(function (response) {
                location.replace("http://localhost:3000/");
            },reason => console.log(reason))


        })
    });
}
