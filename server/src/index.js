const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const exec = require('child_process');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
  origin: '*',  //dominio de origem que vai acessar
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.listen(8000, () => {
  console.log('Servidor porta 8000');
});

//criarJSON();
//executarComando('gpg --batch --yes --armor -u usad@caern.com.br --output ../assets/signed.txt --sign ../assets/json.txt');
//executarComando('gpg --batch --yes --armor --output ../assets/enc.txt --encrypt --recipient security@gooddata.com ../assets/signed.txt');

app.get('/encriptar', (req, res) => {

  criarJSON();

  setTimeout(function () {
    fs.readFile('assets/enc.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const enc = data;
      //console.log(enc);
      enc.replace('\n', '');
      console.log(enc);
      return res.status(200).json({publicKey: enc}); //send(enc);
    });
  }, 700);

});

app.use((err, req, res, next) => res.json({error: err.message}));

function criarJSON(){
  dateInSec = Math.floor(+new Date() / 1000); //data em segundos
  dateInSec = Math.floor(dateInSec + 1800); //adiciona 30 minutos
  const json = `{email: 'usad@caern.com.br', validity: ${dateInSec}}`;
  //fs.writeFile('../assets/json.txt', json);
  fs.writeFile('assets/json.txt', json, (err) => {
    if (err) throw err;
    console.log('O arquivo foi criado!');
    //garantir execução sequencial
    criarSigned('gpg --batch --yes --armor -u usad@caern.com.br --output assets/signed.txt --sign assets/json.txt');
  });
  //console.log(json);
}

function criarSigned(comando){
  exec.exec(comando, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    //garantir execução sequencial
    criarEnc('gpg --batch --yes --armor --output assets/enc.txt --encrypt --recipient security@gooddata.com assets/signed.txt');
  });
}

function criarEnc(comando){
  exec.exec(comando, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

/*
function executarComando(comando){
  exec.exec(comando, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
*/

