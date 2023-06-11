const mysql = require("mysql");

const conn = mysql.createPool({
  host: "********",
  user: "*******",
  password: "*****",
  database: "******",
 
});


conn.getConnection((error, connection) => {
  if (error) {
    if (error.code ===  "PROTOCOL_CONNECTION_LOST") {
      console.log("Database connection was closed");
    }
    if (error.code ===  "ER_CON_COUNT_ERROR") {
      console.log("Database has too many connections");
    }
    if (error.code ===  "ECONNREFUSED") {
      console.log("Database connection was refused");
    }
  } 
  if (connection) {
    connection.release();
    console.log("Conexion a la db ok!");
  }
  return;
});

exports.conn = conn;
