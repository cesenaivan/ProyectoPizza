
// IMPORTS 
// importamos el paquete express de "node_modules"
const Express = require("express");
const userRoutes = require("./routes/user.routes.js").router;
// INICIALIZACIONES
// creamos un objeto de la clase Express
const app = new Express();

// CONFIGURACIONES
app.set("port", process.env.PORT || 3000); 


// Para tratamiento de datos JSON
app.use(Express.json());
// Establecer la carpeta de archivos estáticos: /public
// __dirname: devuelve la ruta del proyecto
app.use(Express.static(__dirname + "/public"));
// RUTAS
app.use(userRoutes);
app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/public/404.html");
});

exports.app = app;