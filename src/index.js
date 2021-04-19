const express = require('express');
const app = express();
require('./db');
// const cors = require('cors');
// const helmet = require('helmet');
const path = require('path');
const handle = require('express-handlebars');

app.use(express.static('public/images'));
app.use(express.static('public'));
//const myStream = require("./utils/logs")


const {
    logErrors,
    errorHandler,
} = require('./utils/middlewares/errorHandlers');

const notFoundHandler = require('./utils/middlewares/notFound');

//  Server configs
const { config } = require('./config/index');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static(path.join(__dirname, 'public')));

//Server side rendering configs
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

const hbs = handle.create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    // helper that was used to handle our data
    helpers: {
        list: function(value,block) {
            let out = ""
           for (let i = 0 ; i < value.length;i++){
               out = out + block.fn({id:i, name: value[i].name, description: value[i].description, elements: value[i].elements}) 
           }
           return out;
        }
    }
});

app.engine('.hbs', hbs.engine);

app.set('view engine', '.hbs');


// Middlewares
// app.use(chart());
// app.use(cors());
// app.use(helmet());
if (config.dev) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Routes
app.use(require('./routes/index'));
app.use('/company', require('./routes/company/network'));

// Error 404
app.use(notFoundHandler);

// Errors middlewares
app.use(logErrors);
app.use(errorHandler);

//  Public Files
// app.use(express.static(path.join(__dirname, 'public')));


//app.use(logRequest())
//app.use(logError())




// app.use(express.static(path.join(__dirname, 'css')));

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});