# discord-bot 🤖

Esté es el código que utiliza mi bot de discord (elperroamongus) para uso personal en mis servidores. No está pensado para ser usado por otros, pero si quieres puedes hacerlo.

## Requisitos

- Node.js
- FFmpeg *(solo para la funcionalidad de convertir videos a mp3)*

## Instalación

1. Clona el repositorio
2. Moverse a la carpeta del repositorio
3. Usar el comando ```npm install```
4. Cambiar el archivo .env.example a .env y rellenar los campos
5. Usar el comando ```npm run start``` para poner en funcionamiento el bot
6. Usar el comando ```npm run register-commands``` para registrar los comandos del bot que van con ```/```.
7. Disfrutar 😁

## Funcionalidades

- Mostrar el icono de un usuario del servidor **/icon [usuario]**
- Borrar de 1 a 5 mensajes de un canal de texto **/delete-msg [canal] [cantidad]**
- Convertir un video que subas a un canal a mp3 **!mp3 [video]**