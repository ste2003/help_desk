var express = require('express');
var bodyParser = require('body-parser');
var rutaMateriaAPI = require('rutas/materia');
var rutaAdjuntoAPI = require('rutas/adjunto');
var rutaBaseAPI = require('rutas/base');
var rutaHomeAPI = require('rutas/homemio');
var fileupload = require('express-fileupload');

var rutaActuaAPI = require('rutas/actua');

var rutaContactoAPI = require('rutas/contacto');

var rutaPreguntaAPI = require('rutas/pregunta');


var app = express();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin','*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(fileupload());
app.use(express.static(__dirname + '/public_html'));
app.use('/actua', rutaActuaAPI);
app.use('/contacto', rutaContactoAPI);
app.use('/adjunto', rutaAdjuntoAPI);
app.use('/pregunta', rutaPreguntaAPI);
app.use('/materia', rutaMateriaAPI);
app.use('/base', rutaBaseAPI);


app.listen(8000, function(){
  console.log("iniciando....");
  console.log("Express server listening en puerto 8000");
});