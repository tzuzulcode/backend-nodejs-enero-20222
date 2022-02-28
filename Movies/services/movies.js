const MovieModel = require("../models/movie")
class Movies{

    validate(movie){
        const error = movie.validateSync()
        if(error){
            const errorMessages = Object.keys(error.errors).map(e=>{
                const errorDetails = error.errors[e]
                if(errorDetails.name === "CastError"){
                    return `El campo "${errorDetails.path}" debe ser: "${errorDetails.kind}"`
                }
                
                return error.errors[e].message
            })
            return {error:true,errorMessages}
        }
        return {error:false}

    }

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

        const movie = new MovieModel(data)
        const validation = this.validate(movie)

        if(validation.error){
            return {created:false,errors:validation.errorMessages}
        }

        return await movie.save()
        
        // movie.validate((error)=>{
        //     console.log(error)
        // })

        // try{
        //     const movie = await MovieModel.create(data)
        //     return movie
        // }catch(error){
        //     return {created:false,message:`Hubo un error`}
        // }
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