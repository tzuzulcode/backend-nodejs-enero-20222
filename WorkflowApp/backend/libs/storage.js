const {Storage} = require("@google-cloud/storage")
const {Readable} = require("stream")
const { bucket_name } = require("../config")

const storage = new Storage({
    keyFilename:"credentials-gcloud.json"
})

//storage.bucket("archivos_aplicacion").upload("",{})


const uploadFile = (fileName,buffer)=>{
    //Referencia al objeto de archivo en google cloud
    const file = storage.bucket(bucket_name).file(fileName)

    // const passthroughStream = new stream.PassThrough()
    // passthroughStream.write(stream)
    // passthroughStream.end()

    const stream = Readable.from(buffer)

    stream.pipe(file.createWriteStream())
    .on("finish",()=>{
        console.log("El archivo se ha cargado exitosamente")
    })
    .on("error",(err)=>{
        console.log(err)
    })
}




module.exports = {uploadFile}


// Streams: Manuel Alexander
