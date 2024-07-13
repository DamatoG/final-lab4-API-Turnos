const { request, response, query } = require("express")
const { readJSONFile } = require('../../utils/fileHandler');

const getAllTurnosByEmpleado = async (req = request, res = response) => {
    try {
      const {idEmpleado } = req.params;
      const { fecha } = req.query;
      
      let turnos, servicios;
  
      try {
        turnos = await readJSONFile('turnos.json');
      } catch (error) {
        return res.status(500).json({ message: 'Error al leer el archivo de turnos', error: error.message });
      }
  
      try {
        servicios = await readJSONFile('servicios.json');
      } catch (error) {
        return res.status(500).json({ message: 'Error al leer el archivo de servicios', error: error.message });
      }
  
      const empleadoId = parseInt(idEmpleado);
      
      if (isNaN(empleadoId)) {
        return res.status(400).json({ message: 'ID de empleado inválido' });
      }
  
      turnosEmpleado = turnos.filter(t => {
        return t.empleadoId === empleadoId;
      });

      if (fecha) {
        turnosEmpleado = turnosEmpleado.filter(t => t.fecha === fecha);
        if (turnosEmpleado.length === 0) {
          return res.status(404).json({ message: 'No existen turnos agendados para este empleado para el dia ' + fecha});
        }}

  
      if (turnosEmpleado.length === 0) {return res.status(404).json({ message: 'No existen turnos agendados para este empleado' });}

      const turnosDetallados = turnosEmpleado.map(turno => {
        const servicio = servicios.find(s => s.id === turno.servicioId);
        return {
          ...turno,
          servicioNombre: servicio ? servicio.nombre : 'Desconocido',
          servicioDuracion: servicio ? servicio.duracion : 0
        };
      });
      
      //Agrupar turnos por fecha
      const turnosAgrupados = turnosDetallados.reduce((acc, turno) => {
        const { fecha } = turno;
        const existingFecha = acc.find(item => item.fecha === fecha);
      
        if (existingFecha) {
          existingFecha.turnos.push(turno);
        } else {
          acc.push({ fecha, turnos: [turno] });
        }
      
        return acc;
      }, []);


      console.log(turnosDetallados)
      res.status(200).json(turnosAgrupados);
  
    } catch (error) {

      res.status(500).json({ message: 'Error al obtener turnos', error: error.message });
    }
  };

const getTurnosLibres = async (req = request, res = response) => {
    try {
      const { idEmpleado } = req.params;
      const { fecha } = req.query;
  
      // Validar que se proporcione una fecha
      if (!fecha) {
        return res.status(400).json({ message: 'La fecha es obligatoria' });
      }
  
      const turnos = await readJSONFile('turnos.json');
      
      // Filtrar turnos del empleado para la fecha especificada
      const turnosDelDia = turnos.filter(t => 
        t.empleadoId === parseInt(idEmpleado) && 
        t.fecha === fecha
      );
  
      // Generar todos los horarios posibles del día
      const todosLosHorarios = [];
      for (let hora = 9; hora < 18; hora++) {
        for (let minuto = 0; minuto < 60; minuto += 30) {
          todosLosHorarios.push(
            `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`
          );
        }
      }
  
      // Filtrar los horarios ocupados
      const horariosOcupados = new Set(turnosDelDia.map(t => t.hora));
  
      // Calcular horarios disponibles
      const horariosDisponibles = todosLosHorarios.filter(horario => {
        // Verificar si el horario actual está ocupado
        if (horariosOcupados.has(horario)) return false;
  
        // Verificar si el horario siguiente (30 minutos después) está ocupado
        const [horas, minutos] = horario.split(':').map(Number);
        let siguienteHora = horas;
        let siguienteMinuto = minutos + 30;
        if (siguienteMinuto >= 60) {
          siguienteHora++;
          siguienteMinuto -= 60;
        }
        const horarioSiguiente = `${siguienteHora.toString().padStart(2, '0')}:${siguienteMinuto.toString().padStart(2, '0')}`;
        
        return !horariosOcupados.has(horarioSiguiente);
      });
  
      res.json({
        dia: fecha,
        cantidadTurnosDisponibles: horariosDisponibles.length,
        turnosDisponibles: horariosDisponibles
      });
    } catch (error) {
      console.error('Error en getTurnosLibres:', error);
      res.status(500).json({ message: 'Error al obtener horarios disponibles', error: error.message });
    }
  };
    

module.exports = {getAllTurnosByEmpleado, getTurnosLibres}




