import express from 'express'

const app = express();
const port = 3000;

let opinions = []

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.render('index.ejs')
});

app.get('/blog', (req, res)=>{
    res.render('blog.ejs')
});

app.get('/opinion', (req, res)=>{
    res.render('opinion.ejs', {opinions})
});

app.get('/contact', (req, res)=>{
    const error = req.query.error;
    const success = req.query.success;
    res.render('contact.ejs', {error, success});
});

app.post('/contact', (req, res)=>{
    const {email, subject, emailContent} = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)){
        return res.redirect('/contact?error=invalidEmail')
    };

    if(!subject || subject.trim() === ''){
        return res.redirect('/contact?error=emptySubject');
    }

    if(!emailContent || emailContent.trim() === ''){
        return res.redirect('/contact?error=emptyContent')
    }

    res.redirect('/contact?success=true')

    console.log(email, subject, emailContent)
})


app.post('/opinion', (req, res)=>{
    const {opinionTextArea} = req.body;

    let id = new Date().getTime()

    console.log(opinionTextArea)

    if(!opinionTextArea || opinionTextArea.trim() === ''){
        return res.redirect('/opinion?error=Opinion%20submit%20empty');
    };

    opinions.push({opinionTextArea, id});
    console.log(opinions)

    return res.redirect('/opinion?success=true');
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`)
});