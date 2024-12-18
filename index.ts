import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";
import { evms, readAlltokensFunction, readFunction } from "./evm";
// import { publicClient } from "./evm";
// import { moonUpFactoryContract } from "./contracts/meme_abi";
// import { parseAbiItem } from "viem";

dotenv.config();

const PORT =  9000;


const app = express();

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded());




app.get("/Enni_creationFeeApitest", async (req, res) => {
    const creationFee = await readFunction()
    res.status(200).send(String(creationFee))
})
app.get("/Enni_creationFeeApitest/:id", async (req, res) => {
    const {id} = req.params
    const creationFee = await readAlltokensFunction(BigInt(id))
    res.status(200).send(String(creationFee))
})


app.use((err: Error, req:Request, res: Response, next: NextFunction) => {
    if (!res.headersSent) {
        res.status(500).send({ message: err.message });
    }
});


async function main(){
    console.log("Attemting Boot");
    // if(!process.env.MONGODB_URI) throw new Error("Connection URI missing");
    // await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connection established");

    // await listenToContractEvents();
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
}




main();