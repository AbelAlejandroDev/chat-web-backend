# Chat-Web Backend

Este repositorio contiene el backend de una aplicación de chat web desarrollada con Node.js, Express, MongoDB y Socket.IO.

## Dev Steps

1.  Clona este repositorio

```bash
git clone https://github.com/tu-usuario/chat-web-backend.git
cd chat-web-backend
```

2. npm install

### 3. Configuración de Variables de Entorno

```markdown
## Configuración de Variables de Entorno

1. Crea un archivo llamado `.env` en el directorio raíz del proyecto:
   PORT: Puerto
   DB_USER: usuario main de la DB
   DB_PASSWORD: password de la DB
   DB_CNN_STRING: Cadena de conexion de la DB
   JWT_KEY: Palabra secreta del JWT
```

## Configuración de la Base de Datos MongoDB

1. Asegúrate de tener una instancia de MongoDB ejecutándose en tu sistema o utiliza un servicio de base de datos en la nube como MongoDB Atlas.

2. Copia la URL de conexión de tu base de datos MongoDB y configúrala en la variable `DB_HOST` del archivo `.env`.

## Ejecución del Servidor

Una vez que hayas instalado las dependencias y configurado las variables de entorno, puedes iniciar el servidor utilizando el siguiente comando:

```bash
npm run dev
```
