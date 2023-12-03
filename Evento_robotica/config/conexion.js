var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'evento_robotica',
    user: 'root',
    password: 'CARMENGIL' 
});

conexion.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('Conexión exitosa')
    }
});



module.exports={conexion}