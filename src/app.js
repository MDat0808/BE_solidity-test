import express from "express";
import initWebRouters from "./routers/web.js";

const app = express();
const port = 8080;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
initWebRouters(app);


app.listen(port, () => {
    console.log(`Sever running on port localhost:${port}`)
})