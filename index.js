const app = require("./server/express");
require("./server/bot")

let date = new Date();
const fecha = `[${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] `;

app.listen(app.get("port"), () => {
    console.log(fecha + "Archivos cargados exitosamente.");
});