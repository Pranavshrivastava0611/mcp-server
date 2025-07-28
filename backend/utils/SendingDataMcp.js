import {extractCommandFromPrompt} from "../utils/gemini.js";
import { forward } from "../controllers/lead.controller.js";


export const SendingDataMcp = async (req,res)=>{
    try{
     const {request} = req.body;
    const data = await extractCommandFromPrompt(request);
    if(data.success === false){
        return res.status(400).json({ success: false, message: data.error});
    }
    const DATA = JSON.parse(data.command);
    const reponse = await forward(DATA);
    res.json(reponse);
    }catch(error){
        console.log("error in SendingDataMcp:",error);
        throw new Error("Failed to forward command to MCP");
    }
}
