const db = require('./database');
const bcrypt = require('bcrypt');
const saltRound = 10;

const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePass = async (password, hash)