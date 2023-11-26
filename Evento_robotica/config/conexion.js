var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'evento_robotica',
    user: 'root',
    password: '1234' 
});

conexion.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('Conexión exitosa')
    }
});



module.exports={conexion}