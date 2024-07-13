const express = require('express')
const cors = require('cors');
const { route } = require('../routes/turnos/turnosRoutes');

class Server {
    constructor(){
        this.app = express();
        this.router();
        this.port = process.env.PORT || 3001;
    }

    router(){
        this.app.use('/api/v1/turnos', require('../routes/turnos/turnosRoutes'));
        this.app.use('/api/v1/empleados', require('../routes/empleados/empleadosRoutes'));
        this.app.all('*', (req, res) => {res.send('Página no encontrada')});
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`API corriendo en http://localhost:${this.port}`)
        })
    }
}



module.exports = Server;