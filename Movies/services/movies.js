const MovieModel = require("../models/movie")
class Movies{
    async get(id){
        const movie = await MovieModel.findById(id)
        return movie
    }

    async getAll(){
        // find devuelve varios elementos
        const movies = await MovieModel.find()
        return movies
    }

    async create(data){
        try{
            const movie = await MovieModel.create(data)
            return movie
        }catch(error){
            const details = error.errors.rating
            return {created:false,message:`El valor '${details.value}' es invalido en ${details.path}`}
        }
        
        
    }

    async update(id,data){
        const movie = await MovieModel.findByIdAndUpdate(id,data,{new:true})
        return movie
    }

    async delete(id){
        const movie = await MovieModel.findByIdAndDelete(id)
        return movie
    }
}

module.exports = Movies