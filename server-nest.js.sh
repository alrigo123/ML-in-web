# Instalar CLI de NestJS
- npm i -g @nestjs/cli

# Crear un nuevo proyecto
nest new "mi-backend"

// START SERVER //
* npm run start || npm run start:dev

# INSTALAR LO NECESARIO
- npm install @nestjs/typeorm typeorm mysql2 cors
- npm install bcryptjs bcrypt @nestjs/jwt @nestjs/passport passport passport-jwt

# Crear un Módulo, Controlador y Servicio para el CRUD (CREATE FOLDER FOR "usuario")
- nest g module "path"
- nest g controller "path" --no-spec
- nest g service "path" --no-spec

## ERROR DE PRETTIER
* Delete ␍eslintprettier/prettier
Solución Configurar Prettier para Usar LF
Abre el archivo .prettierrc en la raíz del proyecto y agrega esta configuración:

    {
      "endOfLine": "lf"
    }

# Guarda el archivo y ejecuta:
- npx prettier --write .

# CONFIGURAR CORS PARA EL ENVIO DE PETICIONES

AQUI NOS QUEDAMOS DEL CHATGPT:
ok, ahora entonces ayudame a implementar el login y register. Con todo lo que implican esas funciones, jwt, hassh, etc
