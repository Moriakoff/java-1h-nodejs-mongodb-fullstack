/**
 * npm install express
 * npm install body-parser
 * npm install mongodb
 *
 * npm install bootstrap
 */


let express = require('express');
let bodyParser = require('body-parser');
let app = express();



let mongo = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
})); //HTML -> <form>

// app.get('/students', function (request, response) {
//     response.send({name: 'David', major: 'Java'});
// });

//body -> JSON, string, application/pdf, application/jpg, application/image


app.post('/students/save', function (request, response) {

    let student = request.body; //firstName, lastName
    student.receivedDate = new Date();


    let url = "mongodb://192.168.99.100:27017/";

    mongo.connect(url, function(err, databaseConnection) {
        if (err) {
            throw err;
        }

        //database -> collections -> documents
        //database -> table       -> row
        //(schema)

        //upsert -> if found - update, if not found - insert


        let databaseObject = databaseConnection.db("students_database");

        databaseObject.collection("students").insertOne(student, function(err, res) {
            if (err) {
                throw err;
            }
            console.log("1 document inserted");

            //JSON.parse     : string    -> JS object
            //JSON.stringify : JS Object -> string

            console.log(res);
            student.url = 'http://localhost:3000/students/' + student._id;

            response.send(student); //firstName, lastName, receivedDate

            databaseConnection.close();
        });

    });
});

app.get('/students/:studentId', function (request, response) {
    let url = "mongodb://192.168.99.100:27017/";

    mongo.connect(url, function(err, databaseConnection) {
        if (err) {
            throw err;
        }


        let databaseObject = databaseConnection.db("students_database");

        let findById = {
            _id: new ObjectId(request.params.studentId)
        };

        databaseObject.collection('students').findOne(findById, function (error, result) {

            console.log(result);
            databaseConnection.close();

            response.send(result);
        })
    });

});


app.get('/students/', function (request, response) {

    let url = "mongodb://192.168.99.100:27017/";

    mongo.connect(url, function(err, databaseConnection) {
        if (err) {
            throw err;
        }


        let databaseObject = databaseConnection.db("students_database");


        databaseObject.collection('students').find({}).toArray(function(error, result) {

            console.log(result);
            databaseConnection.close();

            response.send(result);
        })
    });


});





//localhost:3000
app.get('/', function (req, res) {

    //.sendFile() -> searches in the root of my PC
    //__dirname -> NodeJS directory on my PC


    res.sendFile(__dirname + '/content/index.html');
});

app.use(express.static('content'));
app.use(express.static('node_modules/bootstrap/dist'));

app.listen(3000, function () {
    console.log('Server started at port 3000');
});