

const validationHandler = () => {
    return function (req, res, next)  {
        try{
            
            const array = req.body.elements.split(',')
            if(array.length === 50){
                req.elements = array
                next()
            }else{
                next(new Error("El numero de elementos no es el indicado"))  
            }
            
            
        }
        catch(err){
            next(err)
        }
    }


}

module.exports = validationHandler