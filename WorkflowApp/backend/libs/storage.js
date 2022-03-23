const {Storage} = require("@google-cloud/storage")
const {Readable} = require("stream")
const { bucket_name } = require("../config")
const uuid = require("uuid")
const path = require("path")

const storage = new Storage({
    keyFilename:"credentials-gcloud.json"
})

//storage.bucket("archivos_aplicacion").upload("",{})


const uploadFile = (fileName,buffer)=>{
    
    const ext = path.extname(fileName)
    const uuidFileName = uuid.v4()+ext

    //Referencia al objeto de archivo en google cloud
    const file = storage.bucket(bucket_name).file(uuidFileName)

    const stream = Readable.from(buffer)

    return new Promise((resolve,reject)=>{
        stream.pipe(file.createWriteStream())
        .on("finish",()=>{
            resolve({success:true,message:"File uploaded succesfully",fileName:uuidFileName})
        })
        .on("error",(err)=>{
            console.log(err)
            reject({success:false,message:"An error ocurred"})
        })
    })
}
const downloadFile = (fileName,res)=>{
    //Referencia al objeto de archivo en google cloud
    const file = storage.bucket(bucket_name).file(fileName)

    const stream = file.createReadStream()

    stream.pipe(res)
        .on("finish",()=>{
            console.log("Descargado exitosamente")
        })
        .on("error",(err)=>{
            console.log(err)
        })
}




module.exports = {uploadFile,downloadFile}


// Streams: Manuel Alexander
