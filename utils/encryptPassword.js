const bcrypt = require('bcrypt')

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt)
    return hash
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        if(await bcrypt.compare(password, savedPassword)){
            return true;
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = helpers;