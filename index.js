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
    res.render('contact.ejs')
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`)
});

app.post('/contact', (req, res)=>{
    const {email, subject, emailContent} = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({error: 'Incorrect email format'})
    };

    if(!subject || subject.trim() === ''){
        return res.status(400).json({error: 'Subject cannot be empty'})
    }

    if(!emailContent || emailContent.trim() === ''){
        return res.status(400).json({error: 'Content cannot be empty'})
    }

    res.status(200).json({
        message: 'Form sended correctly',
        data: {
            email: email,
            subject: subject,
            content: emailContent
        }
    })

    console.log(email, subject, emailContent)
})


app.post('/opinion', (req, res)=>{
    const {opinionTextArea} = req.body;

    console.log(opinionTextArea)

    if(!opinionTextArea || opinionTextArea.trim() === ''){
        return res.redirect('/opinion?error=Opinion%20submit%20empty');
    };

    opinions.push(opinionTextArea);
    console.log(opinions)

    return res.redirect('/opinion');
})