//test method
let config = {
    host : '127.0.0.1',
    port : '3306',
    user : 'root',
    password : 'root',
    database : 'items',
    showsql : true
}

let query = require('../index');

query(config);

query([{
    sql : 'select count(1) from music_music',params : []
}])
.then(rs=>{
    console.log(rs);
})