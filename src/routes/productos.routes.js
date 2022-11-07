import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers";
import { check } from "express-validator";
import validarJWT from "../helpers/validar-jwt";

const router = Router();

router
  .route("/productos")
  .get(listarProductos)
  .post(
    [ validarJWT,
      check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({ min: 2, max: 100 })
        .withMessage(
          "El nombre del producto debe tener entre 2 y 100 caracteres"
        ),
      check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage("El precio debe ser un numero")
        .custom((value) => {
          if (value >= 1 && value <= 10000) {
            return true;
          } else {
            throw new Error("El precio debe estar entre 1 y 10000");
          }
        }),
      check("imagen")
        .notEmpty()
        .withMessage("La url de la imagen es obligatoria")
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage("Debe ingresar una url valida"),
      check("categoria")
        .notEmpty()
        .withMessage("La categoria es obligatoria")
        .isIn(["Bebida caliente", "Bebida fria", "Dulce", "Salado"])
        .withMessage('Debe ingresar una categoria valida')
    ],
    crearProducto
  );
//   matches
router
  .route("/productos/:id")
  .get(obtenerProducto)
  .put(validarJWT, editarProducto)
  .delete(validarJWT, borrarProducto);

// app.get('/prueba',(req, res)=>{
//     res.send('esto es una prueba de una peticion get')
// })
// app.delete('/prueba',(req, res)=>{
//     res.send('aqui tendria que borrar un dato')
// })

export default router;
