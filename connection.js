const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host:'localhost',
    user:'web_app',
    password:'test123',
    database:'web_app',
    port:'3306'
})

connection.connect(err => {
    if(err){
        console.log('error connection:',err);
    }
    console.log('db : ' + connection.state);
})


class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
}

module.exports = DbService;
