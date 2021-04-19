const userModel = require("../../db/models/users")
const { v4: uuidv4 } = require('uuid');
class UsersStore {

    constructor(){
        this.model = userModel
    }
    async createCompany(user){
        const id = uuidv4();
        user._id = id
        const userCreated =  await this.model.create(user)
        userCreated.save()
        return userCreated
    }
    async validateCompanyByName(filter){
        const user = await this.model.find(filter)
        if(user[0]){
            return true
        }else{
            return false
        }

    }
    async getCompanyByFilter(filter){
        const user = await this.model.find(filter)
        return user[0]

    }

    async validateByCompanyid(filter){
        const user = await this.model.find(filter)
        if(user[0]){
            return true
        }else{
            return false
         }
    }

    async updateOneCompany(filter,update){
        const userUpdated = await this.model.findOneAndUpdate(filter, update, {new: true});
        return userUpdated
    }

    async deleteOneCompany(id){
        const userDeleted = await this.model.findByIdAndDelete(id)
        if(userDeleted){

            return userDeleted
        }else{
            throw new Error('Company id not found thus the operation was not complited');
        }
    }

    async getCount(){
        return (await this.model.find()).length
    }

    async getAll(){
        const users =  await this.model.find()
        return users
    }
}

module.exports = UsersStore