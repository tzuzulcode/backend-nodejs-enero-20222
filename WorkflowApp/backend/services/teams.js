const TeamModel = require("../models/teams")

class Teams{
    async create(idLeader,data){
        const newTeam = {...data,idLeader,members:[idLeader]}
        const team = await TeamModel.create(newTeam)

        return team
    }

    async listByUser(idUser){
        const teams = await TeamModel.find({members:idUser}).populate("members","name email").populate("idLeader","name email")

        return teams
    }
}


module.exports = Teams