const { config } = require('../../config/index');
const winston = require("winston")
const Controller= require('../../routes/company/controller');
//const { Console } = require('node:console');
const Control = new Controller();

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log' })
    ]
  });

const logErrors = (err, req, res, next) => {
    if (config.dev) {
        logger.log({
            level: 'error',
            message: err.message
          });
        //const files = new winston.transports.File({ filename: 'error.log' });
        const console = new winston.transports.Console();
        logger.add(err)
        console.log(err);

    } else { 
        console.log(err.message);
    }

    next(err);
}

const errorHandler = async (err, req, res, next) => { // eslint-disable-line
  const elements = await Control.getAll();
    for (let index = 0; index < elements.length; index++) {
        elements[index].elements= elements[index].elements[0].split(",")  
    }
    
    res.render('index',{registros:elements,error: err.message})
}

module.exports = {
    logErrors,
    errorHandler,
  
}