const { Router } = require("express");
const { getAllEmpleados, getInfoEmpleado } = require("../../controllers/empleados/empleadosController");

const router = Router();

router.get('/', getAllEmpleados);

module.exports = router;
