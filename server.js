const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://admin:Trinity12@millancluster.hhhah.mongodb.net/hopehacks_db?retryWrites=true&w=majority');

const factSchema = {
    title: String,
    extra: String,
    link: String,
}

const messageSchema = {
    name: String,
    email: String,
    message: String,
}

const Fact = mongoose.model('Fact', factSchema);
const Message = mongoose.model('Message', messageSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get('/resources', (req, res) => {
    Fact.find({}, (err, facts) => {
        console.log(facts)
         res.render('resources', {
            factList: facts
         })
    })
});

app.get('/weather', (req, res) => {
    res.render('weather')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.get('/admin', (req, res) => {

    Fact.find({}, (err, facts) => {
        console.log(facts)
         res.render('admin', {
            factList: facts
         })
    })
});

app.post('/admin', (req, res) => {
    let newFact = new Fact({
        title: req.body.title,
        extra: req.body.extra,
        link: req.body.link
    })
    newFact.save();
    res.redirect('/admin');
})

app.post('/admin/delete', (req, res) => {
    const id = req.body.deleteBtn
    Fact.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log(err)
        }  else {
            res.redirect('/admin');
        }
    });
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Fact.findById(id, (err, fact) => {
        factInfo = [id,fact.title,fact.extra,fact.link]
        console.log(factInfo)
        res.render('edit', factInfo)
            
    })

});

app.post('/admin/edit', (req, res) => {
    const id = req.body.editBtn

    Fact.findByIdAndUpdate(id, { title: req.body.title, extra: req.body.extra, link: req.body.link },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log('success')
    }
});
    res.redirect('/admin');
})

app.post('/send', (req, res) => {
    let newMessage = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })
    newMessage.save();
    res.redirect('/contact');
})

app.listen(process.env.PORT || 4000, () => {
    console.log('server is running...');
});


