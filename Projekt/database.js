const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const dbPromise = (async () => {
    try {
        return open({
            filename: './database.sqlite',
            driver: sqlite3.Database
        });
    }
    catch (error) {
        throw new error('något gick fel med öppning av databasen')
    }
})();

const getUsers = async () => {
    try {
        const dbcon = await dbPromise;
        const users = await dbcon.all('SELECT email, firstname, lastname FROM users ORDER BY email ASC');
        return users;
    }
    catch (error) {
        throw new error('något gick fel med hämtingng av användare')
    }
};
const getQuestions = async () => {
    try {
        const dbcon = await dbPromise;
        const question = await dbcon.all('SELECT * FROM question ORDER BY date ASC');
        return question;
    }
    catch (error) {
        throw new error('något gick fel med hämtingng av question')
    }
};
const getAnswers = async () => {
    try {
        const dbcon = await dbPromise;
        const answer = await dbcon.all('SELECT * FROM answer ORDER BY id ASC');
        return answer;
    }
    catch (error) {
        console.log('något gick fel med hämtingng av answers')
    }
};
const getUser = async (id) => {
    try {
        const dbcon = await dbPromise;
        const user = await dbcon.get('SELECT email, firstname, lastname, id FROM users WHERE id = (?)', [id]);
        return user;
    }
    catch (error) {
        throw new error('något gick fel med hämtingng av user')
    }
};
const getQuestion = async (id) => {
    try {
        const dbcon = await dbPromise;
        const question = await dbcon.get('SELECT * FROM question WHERE id = (?)', [id]);
        return question;
    }
    catch (error) {
        throw new error('något gick fel med hämtingng av question')
    }
};
const getanswer = async (id) => {
    try {
        const dbcon = await dbPromise;
        const answer = await dbcon.all('SELECT * FROM answer WHERE questId = (?)', [id]);
        return answer;
    }
    catch (error) {
        throw new error('något gick fel med hämtingng av answer')
    }
};
const addUser = async (data) => {
    try {
        const dbcon = await dbPromise;
        await dbcon.run('INSERT INTO user (email, firstname, lastname, password) VALUES(?, ?, ?, ?)', [data.email, data.firstname, data.lastname, data.password]);
        return { status: 'ok' }
    }
    catch (error) {
        throw new error('något gick fel med tillägning av Question')
    }
};
const addQuestion = async (data) => {
    try {
        const dbcon = await dbPromise;
        await dbcon.run('INSERT INTO question (title, questionText, category) VALUES(?, ?, ?)', [data.title, data.questionText, data.category]);
        return { status: 'ok' }
    }
    catch (error) {
        throw new error('något gick fel med tillägning av Question')
    }
};
const addanswer = async (data) => {
    try {
        const dbcon = await dbPromise;
        await dbcon.run('INSERT INTO answer (answerText, questId) VALUES(?, ?)', [data.answerText, data.questId]);
        return { status: 'ok' }
    }
    catch (error) {
        throw new error('något gick fel med tillägning av answer')
    }
};
const deleteQuestion = async (id) => {
    try {
        const dbcon = await dbPromise;
        const questDelete = dbcon.run('DELETE FROM question WHERE id=(?)', [id.id]);
        return questDelete;
    }
    catch (error) {
        throw new error('något gick fel med borttagning av product')
    }
};
const deleteanswer = async (id) => {
    try {
        const dbcon = await dbPromise;
        const awnsDelete = dbcon.run('DELETE FROM answer WHERE id=(?)', [id.id]);
        return awnsDelete;
    }
    catch (error) {
        throw new error('något gick fel med borttagning av product')
    }
};

const uppQuestion = async (data) =>{
    try {
        const dbocn = await dbPromise;
        await dbocn.run('UPDATE question SET Title = (?), questionText=(?), category = (?) WHERE id = (?)', [data.title, data.questionText, data.category, data.id]);
    }
    catch (error) {
        throw new error('något gick fel med updatering i databas')
    }
};

const uppanswer = async (data) =>{
    try {
        const dbocn = await dbPromise;
        await dbocn.run('UPDATE answer SET answerText = (?) WHERE id = (?)', [data.answerText, data.id]);
    }
    catch (error) {
        throw new error('något gick fel med updatering i databas')
    }
};
const loginUser = async (data) => {4
    try
    {
        const dbcon = await dbPromise;
        const user = dbcon.get('SELECT email, firstname, lastname, accountType FROM users WHERE email = (?) AND password = (?)', [data.email, data.password]);
        return user; 
    }
    catch(error)
    {
        console.log('något gick fel med inloggning i databasen')
    }
}
const loginAdmin = async (data) => {4
    try
    {
        const dbcon = await dbPromise;
        const user = dbcon.get('SELECT email, firstname, lastname FROM admin WHERE email = (?) AND password = (?)', [data.email, data.password]);
        return user; 
    }
    catch(error)
    {
        throw new error('något gick fel med inloggning i databasen')
    }
}
const loginContributor = async (data) => {4
    try
    {
        const dbcon = await dbPromise;
        const user = dbcon.get('SELECT email, firstname, lastname FROM contiributor WHERE email = (?) AND password = (?)', [data.email, data.password]);
        return user; 
    }
    catch(error)
    {
        throw new error('något gick fel med inloggning i databasen')
    }
}
const image = async (fileName, id) => {
    try 
    {
        const dbcon = await dbPromise;
        await dbcon.run('UPDATE products SET image=(?) WHERE id=(?)', [fileName, id])
    }
    catch(error)
    {
        throw new error('något gick fel med att spara bild i databasen')
    }
}
module.exports = {
    getUsers: getUsers,
    getQuestions: getQuestions,
    getAnswers: getAnswers,
    getUser: getUser,
    getQuestion: getQuestion,
    getanswer: getanswer,
    addUser: addUser,
    addQuestion: addQuestion,
    addanswer : addanswer,
    deleteQuestion : deleteQuestion,
    deleteanswer : deleteanswer,
    uppQuestion : uppQuestion,
    uppanswer : uppanswer,
    loginUser : loginUser,
    loginAdmin : loginAdmin,
    loginContributor : loginContributor,
    image : image
};