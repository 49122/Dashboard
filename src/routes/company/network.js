const express = require('express');
const router = express.Router();
const Controller = require('./controller'); 
const { getCompany, UUID4Schema, createCompanySchema, updateCompanySchema } = require('../../utils/validations/schemas/userExample'); // eslint-disable-line
const validationHandler = require('../../utils/middlewares/validationHandler');
const arrayValidation = require('../../utils/middlewares/arrayValidation');
const Control = new Controller();






router.get('/add',  (req, res) => {
    res.render('links/add')
});

router.post('/add',validationHandler(createCompanySchema), arrayValidation(), async  (req, res,next) => {
        try {

            const elements = req.body.elements.split(',').map(Number)
            const stock_number = Number(req.body.Acciones_en_circulacion) 

            const valor_real = []

            for (let index = 0; index < elements.length; index++) {
                
                valor_real.push(elements[index] + stock_number)
            }
            const valor_realv2 = valor_real.map(String)
            const template = {
                name: req.body.name,
                description: req.body.description,
                elements: valor_realv2
            }
            const companyCreated = await Control.create(template)
            res.render('links/add',{message:{
                message: 'Company added',
                companyName: companyCreated.name,
                companyid: companyCreated._id
                }})
        }catch (error) {
            next(error)
        }
});


router.get('/get',  (req, res) => {
    res.render('links/get')
});

router.post('/get',validationHandler(getCompany), async  (req, res,next) => {
    try {

   
        const companyGot = await Control.getCompanyByName(req.body);


        res.render('links/get',{message: {
            message: 'Company found',
            companyName: companyGot.name,
            companyDescription: companyGot.description,
            companyid: companyGot._id,
            companyElements: companyGot.elements
        } })
        
    } catch (error) {
        next(error)
    }
});

router.get('/edit',  (req, res) => {
    res.render('links/edit')
});

router.post('/edit',validationHandler(updateCompanySchema), async  (req, res,next) => {
    try {
        const companyUpdated = await Control.updateCompany(req.body);

        
        res.render('links/edit',{message: {
            message: 'Company updated',
            companyName: companyUpdated.name,
            companyDescription: companyUpdated.description,
            companyid: companyUpdated._id,
            companyElements: companyUpdated.elements
        } })
        
    } catch (error) {
        next(error)
    }
});

router.get('/delete',  (req, res) => {
    res.render('links/delete')
});

router.post('/delete', async  (req, res,next) => {
    try {
        const _id = req.body._id
        await Control.deleteCompany(_id);
        res.render('links/delete',{ message: {
            message: 'Company deleted'
        } })
        
    } catch (error) {
        next(error)
    }
});

router.get('/registered',  async (req, res) => {
    const cuenta = await Control.getCount(); 
    const registros = await Control.getAll();
    res.render('links/registered',{ cuenta: cuenta,  registros: registros})
});




module.exports = router;