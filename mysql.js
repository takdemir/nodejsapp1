const mysql = require('mysql')

const query = (query) => {

  if (!query) {
    throw new Error("No query")
  }

  return new Promise((resolve, reject) => {
    
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_HOST_PORT
    });

    connection.connect();

    connection.query(query, function (error, results, fields) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    });

    connection.end();
  })
}

module.exports = query
