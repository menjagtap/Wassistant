// const fs = require('fs');
// const DiscoveryV2 = require('ibm-watson/discovery/v2');
// const { CloudPakForDataAuthenticator } = require('ibm-watson/auth');

// const discovery = new DiscoveryV2({
//   authenticator: new CloudPakForDataAuthenticator({
//     url: 'https://api.us-south.discovery.watson.cloud.ibm.com/icp4d-api/v1/authorize',
//     username: 'nandan.jagtap@wipro.com',
//     password: 'IBM@menj321#123',
//   }),
//   version: '2020-08-30',
//   serviceUrl: 'https://api.us-south.discovery.watson.cloud.ibm.com/discovery/v2/instances/e76ade01-9a3e-4a42-9b75-82bc00731651/api',
// });

// const params = {
//   projectId: '910f6397-0264-4065-bf49-e2dba1cf8ca1',
//   collectionId: '834db6d6-f15d-a910-0000-018d87eeadc9',
//   file: fs.createReadStream('fileupload/public/Accounting Live Field.PNG'),
//   filename: 'example-file',
// //   fileContentType: 'application/pdf',
// };

// discovery.addDocument(params)
//   .then(response => {
//     console.log(JSON.stringify(response.result, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });
