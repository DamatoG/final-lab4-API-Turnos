const { Router } = require("express");
const { getTurnosLibres,getAllTurnosByEmpleado, getDetalleTurno } = require("../../controllers/turnos/turnosController");

const router = Router();


router.get('/:idEmpleado', getAllTurnosByEmpleado)


router.get('/:idEmpleado/turnos-disponibles', getTurnosLibres)

module.exports = router;