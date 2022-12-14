//requires
const express = require('express');
const morgan = require('morgan');

const cors = require('cors');
const helmet = require('helmet')

//settings


//initialization
const app = express();
require('dotenv').config();
require('./config/connections')

//middleware
app.use(helmet());

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//conection server

app.set('port', process.env.PORT || 5000) //port conection

//routes server

app.use(require('./routes/user.routes'));//* [✓]
app.use(require('./routes/perfilUsuarios.routes'));//* [✓]
app.use(require('./routes/materias.routes'));//* [✓]
app.use(require('./routes/publicaciones.routes'));



app.use(require('./routes/asistencia.routes'));



app.listen(app.get("port"),()=>
    console.log(`server on port ${app.get("port")}`)
);