const ListService = require("./lists")
const TeamModel = require("../models/teams")

const { uploadFile } = require("../libs/storage")

class Teams{
    async create(idLeader,data,file){
        let uploaded
        if(file){
            uploaded = await uploadFile(file?.originalname,file?.buffer)
        }
        if(uploaded?.success){
            const newTeam = {...data,img:"/files/"+uploaded.fileName,fileKey:uploaded.fileName,idLeader,members:[{_id:idLeader}]}
            const team = await TeamModel.create(newTeam)

            return team
        }else{
            const newTeam = {...data,idLeader,members:[{_id:idLeader}]}
            const team = await TeamModel.create(newTeam)
            return team
        }
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
        const team = await TeamModel.find({_id:idTeam}).populate("members._id","name email").populate("idLeader","name email").populate("lists")
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

    async addList(idTeam,listData){
        const listService = new ListService()
        const list = await listService.create(listData)
        const result = await TeamModel.updateOne({_id:idTeam},{$push:{lists:list.id}})
        return list
    }
    async removeList(idTeam,idList){
        const listService = new ListService()
        const list = await listService.delete(idList)
        const result = await TeamModel.updateOne({_id:idTeam},{$pull:{lists:idList}})
        return list
    }
}


module.exports = Teams