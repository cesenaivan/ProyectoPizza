const Router = require("express");
const conn = require("../conn").conn;
const bcrypt = require("bcrypt");

const router = new Router();
// Expresion Regular REGEXP para el email
const emailREGEXP = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const __dirnameRoutes = __dirname.replace("routes",""); 

router.get("/" , (req, res) => {
  res.sendFile(__dirnameRoutes + "/public/auth3.html");
});

// ruta de registro (signup)
router.post("/signup", (req, res) => {
  // datos que llegan del formulario
  const nombre = req.body.Nombre;
  const email = req.body.Email;
  const pass1 = req.body.pass1;
  const pass2 = req.body.pass2;
  // validacion
  if (nombre.length === 0) {
    res.json("Campo nombre vacío");
  } else if (email.length === 0) {
    res.json("Campo email vacío");
  } else if (!emailREGEXP.test(email)) {
    res.json("Campo email con formato incorrecto");
  } else if (pass1.length === 0) {
    res.json("Campo contraseña vacío");
  } else if (pass1.length < 6) {
    res.json("Campo contraseña con formato incorrecto");
  } else if (pass2.length === 0) {
    res.json("Campo confirmar contraseña vacío");
  } else if (pass1 !== pass2) {
    res.json("Las contraseñas no coinciden");
  } else {// comprobacion de email previamente registrado
    const sql1 = "select email from Users where email = ?";
    conn.query(sql1, [email], (error, results) => {
      if (error) {
        res.json("Ha ocurrido un error en el servidor");
        throw error;
      }
      if (results.length > 0) {
        res.json("El email introducido ya está registrado!");
      } else {
        // encriptacion del password con bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(pass1, salt);
        // insertar datos de usuario en la base datos
        const sql2 = "insert into Users values (default, ?, ?, ?)";
        conn.query(sql2, [nombre, email, hashPass], (error) => {
          if (error) {
            res.json("Ha ocurrido un error en el servidor");
            throw error;
          }
          res.json("Usuario registrado correctamente!");
        });
      }
    });
  }
});

exports.router = router;