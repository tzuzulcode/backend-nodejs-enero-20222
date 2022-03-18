const TeamModel = require("../models/teams")

class Teams{
    async create(idLeader,data){
        const newTeam = {...data,idLeader,members:[{_id:idLeader}]}
        const team = await TeamModel.create(newTeam)

        return team
    }
    // async create(leader,data){
    //     const newTeam = {...data,leader:{
    //         id:leader.id,
    //         name:leader.name,
    //         email:leader.email
    //     },members:[
    //         {
    //             id:leader.id,
    //             name:leader.name,
    //             email:leader.email
    //         }
    //     ]}
    //     const team = await TeamModel.create(newTeam)

    //     return team
    // }

    async listByUser(idUser){
        const teams = await TeamModel.find({members:{  $elemMatch:{_id:idUser} }}).populate("members._id","name email").populate("idLeader","name email")

        return teams
    }
    async get(idTeam){
        const team = await TeamModel.find({_id:idTeam}).populate("members._id","name email").populate("idLeader","name email")
        console.log(team)
        return team[0]
    }
    // async listByUser(id){
    //     const teams = await TeamModel.find({members:{  $elemMatch:{id} }})

    //     return teams
    // }

    async addMember(idTeam,idNewMember){
        const result = await TeamModel.updateOne({_id:idTeam},{$push:{members:{_id:idNewMember}}})
        return result
    }

    async changeRole(idTeam,idMember,newRole){
        const result = await TeamModel.updateOne({_id:idTeam},{$set:{"members.$[el].role":newRole}},{arrayFilters:[{"el._id":idMember}]})
        return result
    }
    async deleteMember(idTeam,idMember){
        const result = await TeamModel.updateOne({_id:idTeam},{$pull:{members:{_id:idMember}}})
        return result
    }
}


module.exports = Teams