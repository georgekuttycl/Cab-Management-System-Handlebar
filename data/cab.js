const db = require('./db');

// function getAll(callback){
//     const sql = "select flight_no,flight_name,flight_description,flight_total_capacity from flight";
//     db.executeQuery(sql,[],callback);
// }

function addOne(email,mobile,password,callback){
    const sql = "insert into cab_signup(email,mobile_number,password) values (?,?,?)";
    db.executeQuery(sql,[email,mobile,password],callback);
}

// module.exports.getAll = getAll;
module.exports.addOne = addOne;