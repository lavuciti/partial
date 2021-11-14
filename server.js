const express = require('express');
const data = require('./data.json');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index', {data: data, title: 'Home'});
})

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'});
})

//primer kako saljemo podatke ka example stranici
// app.get('/example', (req, res) => {
//     //prosledjivanje podataka data
//     res.render('example', {data : JSON.stringify(data)})
// })

app.get('/single/:id', (req, res) => {
    let id = req.params.id;

    let oneElephant = data.filter(el=>{
        return el.id == id;
    })[0];
    console.log(oneElephant);
    res.render('single', {elephant: oneElephant})
})

app.get('/get_data/:id', (req, res) => {
    let id = req.params.id;

    let oneElephant = data.filter(el=>{
        return el.id == id;
    })[0];
    oneElephant.visited++;

    fs.writeFile(__dirname + '/data.json',JSON.stringify(data), (err) =>{
        if (err) throw err;
        res.send(oneElephant);
    })
})

app.listen(3000, () =>{
    console.log('Listening on port 3000');
})
