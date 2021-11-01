const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const { triggerAsyncId } = require('async_hooks');
const googleapi = require('./googleapi');

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/multimidia'));
app.use(express.static(__dirname+'/views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Animais: Valor I - ÁGUIA; Valor C - GATO; Valor A - TUBARÃO; Valor O - LOBO
var animais = [];
// Elementos: Primário; Secundário
var elementos = [];

//Rotas
app.get('/', function(req, res){
    res.render('analise_perfil');
});

app.get('/resultado', function(req, res){
  res.render('resultado', { I: animais[0], C: animais[1], O: animais[2], A: animais[3], elemento_principal: elementos[0], elemento_secundario:elementos[1]});
});

app.get('/resultado_perfil', function(req, res){
    res.render('resultado_perfil');
});

app.post('/resultado_perfil', async function(req, res){
    tratarResultado(req);    
    await new Promise(resolve => setTimeout(resolve, 3000));
    res.redirect('/resultado');        
})

app.listen(8080);

function tratarResultado(req) {
  // Contadores animais
  var I = 0;
  var C = 0;
  var A = 0;
  var O = 0;
  var idade;
  var area;

  for (let index = 0; index <= 25; index++) {
    switch (req.body['r'+ index + '_1']) {
      case 'I':
        I++;
        break;
      case 'C':
        C++;
        break;
      case 'A':
        A++;
        break;
      case 'O':
        O++;
        break;
      default:
    }    
  }
  // Aplica percentual
  I = I * 4;
  C = C * 4;
  A = A * 4;
  O = O * 4;
  
  animais = [];
  animais.push(I);
  animais.push(C);
  animais.push(A);
  animais.push(O);

  elementos = [];
  elementos.push(req.body['rdElementoPrimario']);
  elementos.push(req.body['rdElementoSecundario']);

  idade = req.body['idade'];
  area = req.body['area'];

  // Busca lista de animais predominantes.
  // Animal predominante é aquele com maior valor percentual.
  // Pode haver até 3 animais.
  var maxValorAnimal = Math.max( ...animais );
  var position;
  var animaisPredominantes = [];
  var animaisPredominantesFormatado;
  var listaAnimais = ['ÁGUIA','GATO','TUBARÃO','LOBO']; 
  
  for (let index = 0; index < 5; index++) {
    if(animais[index] == maxValorAnimal){
      animaisPredominantes.push(listaAnimais[index]); 
    }    
  }

  animaisPredominantesFormatado = animaisPredominantes.join('-');

  let date_obj = new Date();
  let date = ("0" + date_obj.getDate()).slice(-2);
  let month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
  let year = date_obj.getFullYear();
  let hours = date_obj.getHours();
  let minutes = date_obj.getMinutes();
  let seconds = date_obj.getSeconds();
  var dataFormatada = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

  insereResultado(idade, area, animaisPredominantesFormatado, dataFormatada);
}

function insereResultado(idade, area, animaisPredominantesFormatado, dataFormatada) {
  googleapi.insertValues(
    elementos[0],
    elementos[1],
    idade,
    area,
    animais[0],
    animais[1],
    animais[2],
    animais[3],
    animaisPredominantesFormatado,
    dataFormatada);
}
