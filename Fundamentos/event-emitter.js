const EventEmitter = require("events")

class Proceso extends EventEmitter{
    pago(cb){
        console.log('Antes del proceso')
        this.emit("verificacion")
        cb()
        this.emit("completado")
        console.log('Después del proceso')
    }
}

const proceso = new Proceso()

proceso.on("verificacion",()=>{
    console.log("Se ha verificado el pago")
})

proceso.on("completado",()=>{
    console.log("Pago completado")
})
proceso.on("completado",()=>{
    console.log("Genera recibo")
})

proceso.pago(()=>{
    console.log("Pagando...")
})