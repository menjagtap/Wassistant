const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const fs = require('fs');
const DiscoveryV2 = require('ibm-watson/discovery/v2');
const { CloudPakForDataAuthenticator, NoAuthAuthenticator, IamAuthenticator } = require('ibm-watson/auth');
// const AssistantV2 = require('ibm-watson/assistant/v2');
//const { IamAuthenticator } = require('ibm-watson/auth');

// const { PDFNet } = require('@pdftron/pdfnet-node');
// const PDFTronLicense = require('../LicenseKey/LicenseKey');




const app = express();
const PORT = process.env.PORT || 4500;
// const assistant = new AssistantV2({
//   version: '2021-06-14',
//   authenticator: new IamAuthenticator({
//     apikey: 'o_dra9GqBHuCabe7M1yhd20qS-izETsyc097E5wlQaLc',
//   }),
//   serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/cfe88785-ee33-4ed5-9036-edf736752cac',
// });
const discovery = new DiscoveryV2({version: '2020-08-30'});
// middle ware
let myFilename;
let uploadStatus;
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

// file upload api
app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
     const myFile = req.files.file;
     myFilename = String(myFile.name);
console.log(myFilename);
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });

    const params = {
      projectId: '4e6b6422-d7e6-4937-9ce2-a442515c6996',
      collectionId: 'ea251231-a25d-e2a0-0000-018db6a2ab54',
      file: fs.createReadStream('public/'+myFilename),
      filename: myFilename,
      fileContentType: 'application/pdf',
    };
    
    discovery.addDocument(params)
      .then(response => {
        console.log(JSON.stringify(response.result, null, 2));         
      })
      .catch(err => {
        console.log('error:', err);
      
      });
    
   

        // assistant.messageStateless({
        //   assistantId: '91df3977-93f8-4d17-a4f8-77545e2a0879',
          
        //   context:{
        //     "skills": {
        //       "actions skill" : {
        //         "skill_variables": {
        //          "FileUploaded" : "true",
        //   }
        // }}}}).then(resassist => {
        //   console.log(JSON.stringify(resassist.result, null, 2));
        // }).catch(err => {
        //   console.log(err);
        // });    

})


app.listen(PORT, () => {
    console.log('server is running at port'+PORT);
})
