const routes = require('express').Router();
const dbservice = require('./database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const multer =require('multer');
const upload = multer({
    dest: 'image/',
    fileFilter: function (req, file, cb) {
    //https://github.com/expressjs/multer/issues/114 användare srkkhan's komentar användes för felhantering
        if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
            return cb(console.log('Only image files are allowed!'));
        }
    cb(null, true);
    }
})
const fs = require("fs").promises;

routes.get('/users/', async (req, res) => {
    try {
        const users = await dbservice.getUsers();
        res.send(users);
    }
    catch (error) {
        console.log('något gick fel med hämtning av användare')
    }
});
routes.get('/questions/', async (req, res) => {
    try {
        const questions = await dbservice.getQuestions();
        res.send(questions);
    }
    catch (error) {
        console.log('något gick fel med hämtning av frågor')
    }
});
routes.get('/answers/', async (req, res) => {
    try {
        const answers = await dbservice.getAnswers();
        res.send(answers);
    }
    catch (error) {
        console.log('något gick fel med hämtning av frågor')
    }
});

routes.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await dbservice.getUser(id);
        res.send(user);
    }
    catch (error) {
        console.log('något gick fel med hämtning av anändare')
    }
});
routes.get('/question/:id', async (req, res) => {
    try {
        const id = req.params.id
        const question = await dbservice.getQuestion(id);
        res.send(question);
    }
    catch (error) {
        console.log('något gick fel med hämtning av fråga')
    }
});
routes.get('/answer/:id', async (req, res) => {
    try {
        const id = req.params.id
        const answer = await dbservice.getanswer(id);
        res.send(answer);
    }
    catch (error) {
        console.log('något gick fel med hämtning av svar')
    }
});
routes.get('/answerId/:id', async (req, res) => {
    try {
        const id = req.params.id
        const answer = await dbservice.getAnswerId(id);
        res.send(answer);
    }
    catch (error) {
        console.log('något gick fel med hämtning av svar')
    }
});
routes.post('/user/:id', async (req, res) => {
    if(req.body.email == ("") || req.body.firstname == ("") || req.body.lastname == ("") || req.body.password == (""))
    {
        res.send('all fields must contain information')
    }
    else
    {
        try {
            const res = await dbservice.addProduct(req.body);
        }
        catch (error) {
            console.log('något gick fel med tillägning av användare')
        }
        res.json({ status: 'user has been added' });
        
    }
});
routes.put('/user', async (req, res) => {
    
    try {
        const res = await dbservice.updateUser(req.body);
    }
    catch (error) {
        console.log(error)
    }
    res.json({ status: 'user has been updated' });
        
    
});
routes.post('/question', async (req, res) => {
    if(req.body.title == ("") || req.body.questionText == ("") || req.body.category == (""))
    {
        res.send('all fields must contain information')
    }
    else
    {
        try {
            const res = await dbservice.addQuestion(req.body);
        }
        catch (error) {
            console.log('något gick fel med tillägning av fråga')
        }
        res.json({ status: 'question has been added' });
    }
});
routes.post('/answer', async (req, res) => {
    if(req.body.answerText == (""))
    {
        res.send('all fields must contain information')
    }
    else
    {
        try {
            const res = await dbservice.addanswer(req.body);
        }
        catch (error) {
            console.log('något gick fel med tillägning av svar')
        }
        res.json({ status: 'answer has been added' });
    }
});
routes.delete('/question/:id', async (req, res) => {
    if(isNaN(req.params.id))
    {
        res.send('id must be an integer')
    }
    else
    {
        try {
            const proddel = await dbservice.deleteQuestion(req.params);
            if(proddel == undefined)
            {
                res.send('ingen fråga på detta id')
            }
            else
            {
                res.send('question bort taggen');
            }
        }
        catch(error) {
            console.log('gick inte att ta bort question i routes');
        }
    }
});
routes.delete('/user/:id', async (req, res) => {
    
    try {
        const proddel = await dbservice.removeUser(req.params);
        if(proddel == undefined)
        {
            res.send('No such user has been found')
        }
        else
        {
            res.send('User has been removed');
        }
    }
    catch(error) {
        console.log(error);
    }

});
routes.delete('/answer/:id', async (req, res) => {
    if(isNaN(req.params.id))
    {
        res.send('id must be an integer')
    }
    else
    {
        try {
            const proddel = await dbservice.deleteanswer(req.params);
            if(proddel == undefined)
            {
                res.send('inget svar på detta id')
            }
            else
            {
                res.send('svar bort tagget');
            }
        }
        catch(error) {
            console.log('gick inte att ta bort svaret i routes');
        }
    }
})
routes.put('/question', async (req, res) => {
    if(req.body.title == ("") || req.body.questionText == ("") || req.body.category == ("") || req.body.id == (""))
    {
        res.send('all fields must contain information')
    }
    else
    {
        if(isNaN(req.body.id))
        {
            res.send('id must be an integer')
        }
        else
        {
            try
            {
                const update = await dbservice.uppQuestion(req.body)
                res.send(update)
            }
            catch(error)
            { 
                console.log('det gick inte att updatera frågan i routes');
            }
        }
    }
});
routes.put('/answer', async (req, res) => {
    if(req.body.answerText == ("") || req.body.id == (""))
    {
        res.send('all fields must contain information')
    }
    else
    {
        if(isNaN(req.body.id))
        {
            res.send('Price and id must be an integers')
        }
        else
        {
            try
            {
                const update = await dbservice.uppanswer(req.body)
                res.send(update)
            }
            catch(error)
            { 
                console.log('det gick inte att updatera svaret i routes');
            }
        }
    }
});
routes.post('/userLogin', async (req, res) =>{
    try
    {
        const user = await dbservice.loginUser(req.body);
        if(user == undefined)
        {
            res.send("Wrong email or password")
        }
        else
        {
            res.json(user)
        }
    }
    catch(error)
    {
        console.log('det gick inte att logga in i routes')
    }
});
routes.post('/adduser', async (req, res) => {
    try {
        if (req.body.email == ("") || req.body.firstname == ("") || req.body.lastname == ("") || req.body.password == (""))
        {
            res.send(' All fields must contain information. ');
            console.log(' All fields must contain information. ');
        }
        else {
            await dbservice.addUser(req.body);
            res.json({status: "ok"});        
        }       
    }
    catch(error)
    {
        res.send('Error registering new user');
        console.log(error);
    }
    
});
// routes.post('/contibruterLogin', async (req, res) =>{
//     try
//     {
//         const user = await dbservice.login(req.body);
//         if(user == undefined)
//         {
//             res.send("Wrong email or password")
//         }
//         else
//         {
//             res.json(user)
//         }
//     }
//     catch(error)
//     {
//         console.log('det gick inte att logga in i routes')
//     }
// });
// routes.post('/adminLogin', async (req, res) =>{
//     try
//     {
//         const user = await dbservice.login(req.body);
//         if(user == undefined)
//         {
//             res.send("Wrong email or password")
//         }
//         else
//         {
//             res.json(user)
//         }
//     }
//     catch(error)
//     {
//         console.log('det gick inte att logga in i routes')
//     }
// });
routes.post('/image/:id', upload.single('file'), async (req, res) => {
    const file = req.file;
    const exts = req.file.originalname.split('.');
    const fileEnd = exts[exts.length - 1];
    const fileName = './public/images/' + req.params.id + '.' + fileEnd;
    const imgName = req.params.id + '.' + fileEnd;
    try {
        const fileWrite = await fs.rename(file.path, fileName);
        if(!fileWrite){
            res.json({'status' : 'ok'});
            await dbservice.image(imgName, req.params.id);
        }
        else {
            throw error;
        }
    }
    catch (error) {
        await fs.unlink(file.path);
        res.status(400).json(error);
        console.log('det gick fel med bilden i routes')
    }
});
module.exports = routes;