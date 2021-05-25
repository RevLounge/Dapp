# Rewards
El desarrollo de este proyecto se ha realizado íntegramente en Windows 10.

Lista de dependencias:
-	Node
-	Truffle suite
-	Ganache or ganache-cli
-	MetaMask
-	Yarn
-	MongoDB

Instalación:
Node 
En primer lugar, es necesario tener instalado node.js y npm. Para instalarlo puede utilizar el siguiente enlace:
https://nodejs.org/es/
Truffle
Una vez instalado npm, utilice la consola para instalar truffle:
npm install -g truffle

Ganache
Todo el trabajo ha sido desarrollado con la versión de escritorio de Ganache, no obstante, si se prefiere, se puede emplear la versión de consola. Para descargar la versión de escritorio utilice este enlace:
https://www.trufflesuite.com/ganache
Si se prefiere la versión de consola:
npm install -g ganache-cli

# MetaMask
Es necesario instalar la extensión de MetaMask para poder interactuar con la aplicación en el navegador. Los navegadores compatibles son Chrome, Firefox, Edge y Brave. Utilice el siguiente enlace para elegir su versión:
https://metamask.io/download.html
Una vez instalada la extensión, importe sus claves privadas de Ganache siguiendo los pasos que se indican en MetaMask.  Ahora debemos conectarnos a la red de pruebas de Ganache. Para ello, despliegue el menú donde pone “Main Network” y seleccione “Custom RPC”. En la casilla de “New RPC URL” introduce: 
http://127.0.0.1:7545
En el ID de Cadena: 1337. Y escoja el nombre que más le guste. Para más información puede vistar este enlace: https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask.

# Yarn
Hemos utilizado yarn como gestor de paquetes, en un principio no sería necesario y con npm se podría realizar la misma función. Sin embargo, recomendamos el uso de yarn para evitar posibles problemas en la instalación de los módulos.
npm install --global yarn

#	MongoDB
Por último, es necesario tener instalado Mongo, para ello utilice:
https://www.mongodb.com/try/download/community
Una vez este corriendo MongoDB, descargue el código o clone el proyecto de github desde este enlace:
https://github.com/carlosrodrih/Rewards

#	Después de instalar las dependencias y descargar el código:
Desde la terminal de Visual Studio Code realice yarn install desde las siguientes carpetas:
-	rewards
-	rewards-app
Desde rewards-app, realice la migración de los contratos, ejecute:
truffle migrate
Desde rewards-app/server escriba en la terminal, si este comando le da problemas asegúrese de tener yarn y npm en el path:
nodemon
Ya está todo liso para arrancar la aplicación, lance las aplicaciones en este orden:
-	En localhost:3000, desde la carpeta de rewards-app -> yarn start
-	En localhost:3001, desde la carpeta de rewards -> yarn start
