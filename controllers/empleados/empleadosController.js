const { request, response } = require("express");
const { readJSONFile } = require('../../utils/fileHandler');

const getAllEmpleados = async (req = request, res = response) => {
    try {
        const empleados = await readJSONFile('empleados.json');
        res.status(200).json(empleados);
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error });
      }
    };

    

module.exports = { getAllEmpleados };





