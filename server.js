const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));   //.use registering middleware\

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} `;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('uunable to log ');
        }
    })

    next();

})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

//setting up an handler
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: "Vaibhav",
    //     likes: [
    //         "Amazon",
    //         "Google",
    //         "Microsoft"
    //     ]
    // }); 
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        //currentYear: new Date().getFullYear(),
        welcomeMessage: 'Hello, Welcome to the home page of handle bars'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear()    since we have added register helper we dont need not to add it here
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle this request'
    });
});

//binds app to port on our machine
app.listen(3000);
