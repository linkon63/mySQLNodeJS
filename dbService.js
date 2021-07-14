const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

var connection = mysql.createConnection({
    host: '162.213.250.72',
    user: 'nodeeas_user',
    password: '123456',
    database: 'nodeeas_line'
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db Connection : ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM lineuser;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log('getAllData Response:',response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewUser(data) {
        try {
            console.log('insetNewUser:',data);
            const {userId,displayName,pictureUrl} = data;
            console.log(userId,displayName);
            // const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO lineuser (userId,displayName,pictureUrl) VALUES (?,?,?);";
                connection.query(query, [data.userId, data.displayName, data.pictureUrl] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);   
                })
            });
            console.log(insertId);
            return {
                userId: userId,
                displayName: displayName,
                pictureUrl: pictureUrl
            };
        } catch (error) {
            console.log('InsertERROR',error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;