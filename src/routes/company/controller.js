const UserStore = require('./store')


class  userController {

    constructor(){
        this.store = new UserStore()
    }

    
    async create(company){

        const validation = await this.store.getCompanyByFilter({ name: company.name })
        if(validation) throw new Error("We already have that company in our data base")
    
        return await this.store.createCompany(company)

    }

    async getCompanyByName(companyname){
        
        const validation = await this.store.validateCompanyByName({ name: companyname.name })
        if(!validation) throw new Error("This company does not exist in our data base")
        const company = await this.store.getCompanyByFilter({name: companyname.name })
        return company
    }
    
    async updateCompany(companyData){
        const validation = await this.store.validateByCompanyid({ _id: companyData._id })
        if(!validation) throw new Error("The id does not match any company")

        const userSaved = await this.store.getCompanyByFilter({_id: companyData._id })

        let userUpdate = {
            name: companyData.name || userSaved.name,
            description: companyData.description || userSaved.description,
            elements: companyData.elements || userSaved.elements ,
            _id: companyData._id
        }

        const updated = await this.store.updateOneCompany({ _id: userUpdate._id }, userUpdate);
        return updated
    }

    async deleteCompany(id){

        const user = await this.store.deleteOneCompany(id)
        return user

    }

    async getCount(){
        return await this.store.getCount()
    }
    

    async getAll(){
        return await this.store.getAll()
    }



}

module.exports = userController