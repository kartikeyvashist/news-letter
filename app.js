const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();

app.use(express.static("Public")); 

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){
    
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    const url = 'https://us14.api.mailchimp.com/3.0/lists/86193cb483';

    const options = {
        method: 'POST',
        auth: "Kartikey:d0afd2b26e9f153d810ed4a2afd22d2d",

    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + '/success.html');
        }

        else
        {
            res.sendFile(__dirname + '/failure.html');
        }


        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.listen(3000, function(){
    console.log('listening on port 3000');
});
// _Api key
// d0afd2b26e9f153d810ed4a2afd22d2d-us14
// list id
// 86193cb483