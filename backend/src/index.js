//const { json } = require('express');
const express = require('express'); //it's working ?
const app = express();
const cors = require('cors');
const  routes = require('./routes');
const https = require('https');
const fs = require('fs');
const path = require('path');
app.use(express.json());
app.use(cors());
app.use(routes);
const sslServer = https.createServer(
{
    key:fs.readFileSync(path.join(__dirname,'cert', 'cert-key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'cert', 'cert.pem')),

},app)
sslServer.listen(3443, console.log('ola?'));


