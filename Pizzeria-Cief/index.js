const app = require("./app.js").app;
// conexión Database
require("./conn.js");

// App escuchando por puerto 3000
const port = app.get("port");
app.listen(process.env.PORT || port, () => console.log(`Servidor web escuchando por: http://localhost:${port}`)); 