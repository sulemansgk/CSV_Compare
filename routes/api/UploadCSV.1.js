const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const csv = require('csv-parse');
var CompoundCsvData = [];

//CSV Models
const Csvheaders = require('../../models/Csvheaders');
const CsvData = require('../../models/Csvdata')


var upload = multer({
    dest: 'uploads/',
});
//@route    GET  api/UploadCSV/test 
//@desc     To test the route for profile
//access    Public
router.get('/test', (req, res) => res.json({
    msg: "Profile Works"
}));


//@route    POSt  api/profile/test 
//@desc     To recieves CSV files from the front and upload it to the database
//access    Public
router.post('/csv', upload.single('myfile'), (req, res) => { // the function requires one essential argument that is myfile 

    var file = req.file;
    var Csvheadername = file.originalname;


    Csvheaders.findOne({
        name: Csvheadername
    }).then(Csvheader => {
        if (Csvheader) {

            //if the function sees that there is a setting perviously for this CSV it wont ask for adding headers
            // and directly stores the data in database
            //reading the files 
            fs.createReadStream(file.path)
                .pipe(csv())
                .on('data', function (data) {
                    CompoundCsvData.push(data);
                }).on('end', function () {
                    const packeddata = {
                        Csvheadername: Csvheadername,
                        Csvheader: Csvheader,
                        CompoundCsvData: CompoundCsvData
                    }
                    //this function will fire after running the file read  is completed, this function will store the data into the database
                    PreparingCSVStroage(packeddata) //prepares the file to store in db
                        .then(resolve => {
                            res.json(JSON.stringify(resolve));
                        });
                });


        } else {
            //if the function sees that there is no setting perviously for this it will ask for adding headers
            const Newcsvheader = new Csvheaders({
                name: Csvheadername,
                csvhearders: {
                    header1: 'name',
                    header2: 'age',
                }
            });
            Newcsvheader.save()
                .then(csvheaders => {
                    fs.createReadStream(file.path)
                        .pipe(csv())
                        .on('data', function (data) {
                            CompoundCsvData.push(data);
                        }).on('end', function () {
                            const packeddata = {
                                Csvheadername: csvheaders.name,
                                Csvheader: Csvheader,
                                CompoundCsvData: CompoundCsvData
                            }
                            //this function will fire after running the file read  is completed, this function will store the data into the database
                            PreparingCSVStroage(packeddata) //prepares the file to store in db
                                .then(resolve => {
                                    res.json(JSON.stringify(resolve));
                                });
                        });




                })
                .catch(err => console.log(err));
        }

    });
});


function PreparingCSVStroage(packeddata) { // this will get the data from the functions and store it in the database
    return new Promise((resolve, reject) => {
        const CsvDataStroage = new CsvData({
            csvhearders: packeddata.csvhearder,
            name: packeddata.Csvheadername,
            csv_data: packeddata.CompoundCsvData
        });
        CsvDataStroage.save()
            .then(resolve("The stroage was sucess"))
            .catch(err => console.log(err));
    });


}


module.exports = router;