const express = require('express');
const config = require('./config');
const chalk = require('chalk');
const figlet = require('figlet');

const loadServer =require('./loaders/index')
require('dotenv').config()
async function startServer() {

  const app = express();
    //init keyckloack
    

  const keycloak=require('./loaders/keycloak-config.js').initKeycloak();

  const httpServer = loadServer(app);
 

  (await httpServer).listen(config.PORT, () => {

    console.log(chalk.redBright(figlet.textSync('Fixed Asset', { font: 'Slant' })));
    console.log(chalk.redBright(figlet.textSync('Management', { font: 'Slant' })));

    console.log(chalk.redBright(figlet.textSync('  v1.0', { font: 'Slant' })));
    
    console.log(chalk.cyanBright('  Server Info'));
    console.log(chalk.cyanBright('  -----------'));

    console.log(chalk.cyanBright('> Port: ' + config.PORT));
    console.log(chalk.cyanBright('> DB url: ' + config.db));
    console.log('\n');




  });
}
 startServer();















