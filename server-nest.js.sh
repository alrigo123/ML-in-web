# Instalar CLI de NestJS
- npm i -g @nestjs/cli

# Crear un nuevo proyecto
nest new "mi-backend"

// START SERVER //
* npm run start || npm run start:dev

# INSTALAR LO NECESARIO
- npm install @nestjs/typeorm typeorm mysql2 cors  @nestjs/config
- npm install bcryptjs bcrypt @nestjs/jwt @nestjs/passport passport passport-jwt

# Create full users folder with controllers entities and Data Transfer Object DTO
nest g res users --no-spec

# Crear un Módulo, Controlador y Servicio para el CRUD (CREATE FOLDER FOR "usuario")
- nest g module "path"
- nest g controller "path" --no-spec
- nest g service "path" --no-spec

# GUARD
''' los guards son una funcionalidad que permite controlar si una determinada
ruta o endpoint en una aplicación puede ser accedida por un cliente o no.
Los guards se pueden utilizar para aplicar lógica de autenticación,
autorización o cualquier otro tipo de validación antes de permitir
que una solicitud llegue al controlador correspondiente. '''
- nest g guard auth --no-spec

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
