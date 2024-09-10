import express from 'express'

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index.ejs')
});

app.get('/blog', (req, res)=>{
    res.render('blog.ejs')
});

app.get('/opinion', (req, res)=>{
    res.render('opinion.ejs')
});

app.get('/contact', (req, res)=>{
    res.render('contact.ejs')
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`)
});