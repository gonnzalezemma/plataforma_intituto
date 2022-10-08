    
# PROYECTO ADMINISTRADOR INSTITUTO 
### **Proyecto**
    
1. Modelado de datos 19/9/22 [✓]
2. Instalar librerias(helmet,bcryptjs,body-parser,cors,dotenv,express,express-validator,jsonwebtoken, mongoose,morgan,multer) 20/9/22 [✓]
3. Iniciar Servidor mediante express 20/9/22 [✓]
4. Estructurar carpetas 22/9/22 [✓]
5. Declarar las rutas 22/9/22 [✓] 
6. Crear archivo de controladores necesarios(asistencia, user, materias,perfil) 24/9/22 [✓]  
7. Crear archivos en routes(user, perfil, asistencias, materias) 27/9/22 [✓]
8. Controladores (user) 2/10/22 [✓]
9. Controladores (materias) 2/10/22 [✓]
10. Controladores (perfilUser) 2/10/22 [✓]
11. 

## Entidades
### **Las Entidades son:**
- Administrativo
- Profesor
- Alumno

## DATOS REQUERIDOS PARA ALUMNO
---
### **Alumnos**
1. DNI 
2. Password
3. Domicilio
4. Numero de telefono
5. Año
6. Carrera
7. documentaciones entregadas:value
8. notas de las materias
9. asistencias



## DATOS REQUERIDOS PARA ADMINISTRATIVO

#### **Administrativo**
1. DNI 
2. Password
3. Domicilio
4. Numero de telefono
5. DNI 
6. Correo


## DATOS REQUERIDOS PARA PROFESOR

### **Profesor**
1. DNI 
2. Password
3. Domicilio
4. Numero de telefono
5. Carreras
6. Materias

# **Modelo Mongoose**
## Model asistencia
```js

{
    
    alumnos:[
        {
            alumno:{
                type: Schema.Types.ObjectId,
                ref: 'Usuario'
            },
            asistencia:{
                type:Boolean,
                default:true,
                required:true,  
        }
    },
],
    fecha:{
       type:Date,
       required:true
    },
    active:{
        type:Boolean,
        required:true
    }


```

## Model Materias

```js

    nombreMateria:{
        type: String,
        required:true
    },
    profesores:[
        
        {
        type:Schema.Types.ObjectId,
        ref: 'Usuario'
        }
    ],
    horarioDesde:{
        type: String,
        required:true
    },
    horarioHasta:{
        type: String,
        required:true
    },
    notas:
      [
          
          {
            alumno:{
                type:Schema.Types.ObjectId,
                ref: 'Usuario'
            },
          primerParcial:{
              type: Number,
              
          },
          segundoParcial:{
              type: Number,
              
          },
          tercerParcial:{
              type: Number,
          }
        }
    
    ],
    publicaciones:{
        type:Schema.Types.ObjectId,
        ref: 'Publicacion'
    }


```

## Model perfilUser
```js
      userId: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  celular: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  carreras: [
    {
      carrera: {
        type: String,
        required: true,
      },
      materias: [
        {
          type: Schema.Types.ObjectId,
          ref: "Materia",
        },
      ],
    },
  ],
         
```

## Model User
```js
     
    dni:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    
         
```

## Model Publicaciones
```js
   

    author:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'   
    },
    content:{
        type: String,
       
    },
    comentarios:[{
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'Usuario'    
        },
        content:{   
        type: String,
        required: true
        },
        timeStamp:{
            createdAt: Date,
            default: Date.now()
        }
    }],
    timeStamp:{
        createdAt: Date,
        default: Date.now()
    },    
```