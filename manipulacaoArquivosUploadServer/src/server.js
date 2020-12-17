const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
const data = require('../data.json');
const multer = require('../src/middlewares/multer');


const server = express();

server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));


server.set('view engine', 'html');

nunjucks.configure(__dirname + '/views', {express:server})

server.get('/', (request, response) => { 
    return response.render('products');
});

server.post('/products',multer.array('photos',6), (request, response)=> {

    const dados = request.body;
    const chaves = Object.keys(dados);
    for(chave of chaves){
        if(dados[chave] === ""){
         return response.send('por favor, preenche todos os campos');
        }
    }
    const arquivos = request.files;
    console.log(arquivos)

    if(arquivos.length == 0){
        return response.send('por favor, envie ao menos uma imagem');
    }
    const {name, description} = dados;

    let filePaths = [];

    arquivos.forEach(file => {
        const {path} = file;
        filePaths.push(path);
    })

    data.products.push({
        name,
        description,
        filePaths
    });

    fs.writeFile('data.json', JSON.stringify(data,null,2), (error)=> {
        if(error) return resonse.send('erro durante a escrita no arquivo json')
    });

    return response.redirect('/');
    

})

server.listen(3333, ()=> {
    console.log('Server is running');
})