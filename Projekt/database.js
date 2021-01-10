const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

function makeDate() {
    var date = new Date();
    var dateStr =
    date.getFullYear() + "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getDate()).slice(-2) + " " +
  
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
    return dateStr
}



const dbPromise = (async () => {
    try {
        return open({
            filename: './database.sqlite',
            driver: sqlite3.Database
        });
    }
    catch (error) {
        console.log('något gick fel med öppning av databasen')
    }
})();

const updateUser = async (data) =>{
    try {
        const dbCon = await dbPromise;
        await dbCon.run('UPDATE users SET email = (?), firstname = (?), lastname = (?), accountType = (?), blocked = (?) WHERE id = ?', [data.email, data.firstname, data.lastname, data.accountType, data.blocked, data.id]);
    }
    catch (error) {
        console.log('något gick fel med updatering i databas')
        console.log(error)
    }
};
const getUsers = async () => {
    try {
        const dbCon = await dbPromise;
        const users = await dbCon.all('SELECT id, email, firstname, lastname, accountType, blocked FROM users ORDER BY email ASC');
        return users;
    }
    catch (error) {
        console.log('något gick fel med hämtingng av användare')
    }
};
const getQuestions = async () => {
    try {
        const dbCon = await dbPromise;
        const question = await dbCon.all('SELECT * FROM question ORDER BY date ASC');
        return question;
    }
    catch (error) {
        console.log('något gick fel med hämtingng av question')
    }
};
const getAnswers = async () => {
    try {
        const dbCon = await dbPromise;
        const answer = await dbCon.all('SELECT * FROM answer ORDER BY id ASC');
        return answer;
    }
    catch (error) {
        console.log('något gick fel med hämtingng av answers')
    }
};
const getAnswerId = async (id) => {
    try {
        const dbCon = await dbPromise;
        const question = await dbCon.get('SELECT * FROM answer WHERE id = (?)', [id]);
        return question;
    }
    catch (error) {
        console.log('något gick fel med hämtingng av question')
    }
};
const getUser = async (id) => {
    try {
        const dbCon = await dbPromise;
        const user = await dbCon.get('SELECT email, firstname, lastname, accountType, blocked, id FROM users WHERE id = (?)', [id]);
        return user;
    }
    catch (error) {
        console.log('något gick fel med hämtingng av user')
    }
};
const getQuestion = async (id) => {
    try {
        const dbCon = await dbPromise;
        const question = await dbCon.get('SELECT * FROM question WHERE id = (?)', [id]);
        return question;
    }
    catch (error) {
        console.log('något gick fel med hämtingng av question')
    }
};
const getanswer = async (id) => {
    try {
        const dbCon = await dbPromise;
        const answer = await dbCon.all('SELECT * FROM answer WHERE questId = (?)', [id]);
        return answer;
    }
    catch (error) {
        console.log('något gick fel med hämtingng av answer')
    }
};
// const addUser = async (data) => {
//     try {
//         const dbcon = await dbPromise;
//         await dbcon.run('INSERT INTO user (email, firstname, lastname, password) VALUES(?, ?, ?, ?)', [data.email, data.firstname, data.lastname, data.password]);
//         return { status: 'ok' }
//     }
//     catch (error) {
//         console.log('något gick fel med tillägning av Question')
//     }
// };
const addQuestion = async (data) => {
    try {
        dateStr = makeDate()
        const dbCon = await dbPromise;
        await dbCon.run('INSERT INTO question (title, questionText, category, date, author) VALUES(?, ?, ?, ?, ?)', [data.title, data.questionText, data.category, dateStr, data.author]);
        return { status: 'ok' }
    }
    catch (error) {
        console.log('något gick fel med tillägning av Question')
    }
};
const addanswer = async (data) => {
    try {
        dateStr = makeDate()
        const dbCon = await dbPromise;
        await dbCon.run('INSERT INTO answer (answerText, questId, date, author) VALUES(?, ?, ?, ?)', [data.answerText, data.questId, dateStr, data.author]);
        return { status: 'ok' }
    }
    catch (error) {
        console.log('något gick fel med tillägning av answer')
    }
};
const deleteQuestion = async (id) => {
    try {
        const dbCon = await dbPromise;
        const questDelete = dbCon.run('DELETE FROM question WHERE id=(?)', [id.id]);
        return questDelete;
    }
    catch (error) {
        console.log('något gick fel med borttagning av product')
    }
};

const deleteanswer = async (id) => {
    try {
        const dbCon = await dbPromise;
        const anwsDelete = dbCon.run('DELETE FROM answer WHERE id=(?)', [id.id]);
        return anwsDelete;
    }
    catch (error) {
        console.log(error)
    }
};

const uppQuestion = async (data) =>{
    try {
        const dbCon = await dbPromise;
        await dbCon.run('UPDATE question SET Title = (?), questionText=(?), category = (?) WHERE id = (?)', [data.title, data.questionText, data.category, data.id]);
    }
    catch (error) {
        console.log(error)
    }
};

const uppanswer = async (data) =>{
    try {
        const dbCon = await dbPromise;
        await dbCon.run('UPDATE answer SET answerText=(?), questId=(?), rating=(?) WHERE id=(?)', [data.answerText, data.questId, data.rating, data.id]);
    }
    catch (error) {
        console.log(error)
    }
};
const loginUser = async (data) => {4
    
    
    try
    {
    const wrongInput = []
    const dbCon = await dbPromise;
    const hashPassword = await dbCon.get('SELECT password FROM users WHERE email = ?', [data.email]);
    const match = await bcrypt.compareSync(data.password, hashPassword['password']);
    
        if (match)
        {
            const user = await dbCon.get('SELECT email, firstname, lastname, accountType, blocked FROM users WHERE email = ?', [data.email]);
            return user; 
        }
        else
        {
            return wrongInput
        }
    }
    catch(error)
    {
        console.log(error)
        console.log('något gick fel med inloggning i databasen')
    }
}
const addUser = async (data) => {
    try {
        const dbCon = await dbPromise;
        await bcrypt.hash(data.password, saltRounds).then(function(hash){
            dbCon.run("INSERT INTO users (email, firstname, lastname, password, accountType) VALUES(?, ?, ?, ?, ?)", [data.email, data.firstname, data.lastname, hash, data.accountType]);
            return { status: 'ok'};
        });
        
    }
    catch(error)
    {
        console.log(error)
        throw new Error('Something went wrong with the database, registering the user.');
    }
};
const removeUser = async (id) => {
    try {
        const dbCon= await dbPromise;
        await dbCon.run('DELETE FROM users WHERE id=?', [id.id]);
        return { status: 'User removed, database updated'}
    }
    catch(error)
    {
        console.log(error)
        throw new Error('Couldnt talk to the database...');
    }
};
// const loginAdmin = async (data) => {4
//     try
//     {
//         const dbcon = await dbPromise;
//         const user = dbcon.get('SELECT email, firstname, lastname FROM admin WHERE email = (?) AND password = (?)', [data.email, data.password]);
//         return user; 
//     }
//     catch(error)
//     {
//         console.log('något gick fel med inloggning i databasen')
//     }
// }
// const loginContributor = async (data) => {4
//     try
//     {
//         const dbcon = await dbPromise;
//         const user = dbcon.get('SELECT email, firstname, lastname FROM contiributor WHERE email = (?) AND password = (?)', [data.email, data.password]);
//         return user; 
//     }
//     catch(error)
//     {
//         console.log('något gick fel med inloggning i databasen')
//     }
// }
const image = async (fileName, id) => {
    try 
    {
        const dbCon = await dbPromise;
        await dbCon.run('UPDATE products SET image=(?) WHERE id=(?)', [fileName, id])
    }
    catch(error)
    {
        console.log(error)
    }
}
module.exports = {
    getUsers : getUsers,
    getQuestions : getQuestions,
    getAnswers : getAnswers,
    getUser : getUser,
    getQuestion : getQuestion,
    getanswer : getanswer,
    getAnswerId : getAnswerId,
    addUser : addUser,
    updateUser : updateUser,
    addQuestion: addQuestion,
    addanswer : addanswer,
    deleteQuestion : deleteQuestion,
    deleteanswer : deleteanswer,
    removeUser : removeUser,
    uppQuestion : uppQuestion,
    uppanswer : uppanswer,
    loginUser : loginUser,
    
    // loginAdmin : loginAdmin,
    // loginContributor : loginContributor,
    image : image
};