var mysql = require('mysql2');
var secretConfig = require('../secret-config.json');

function connectDB() {
  var con = mysql.createConnection({
      host: secretConfig.DB_HOST,
      user: secretConfig.DB_USER,
      password: secretConfig.DB_PASSWORD,
      database: secretConfig.DB_NAME,
  });
  con.connect(function(err) {
      if (err) {
          console.log("MySQL is not connected.");
          throw err;
      }
      console.log("Connected to MySQL!");
  });
  return con;
}

module.exports = {
    connectDB,
    default: {
        connectDB
    }
};