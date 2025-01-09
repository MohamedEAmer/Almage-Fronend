import userModel from "../models/userModel.js"
import FormData from "form-data"
import axios from "axios"


const generateImage = async (req,res)=>{
    try {

        const {userId , prompt} = req.body
        const user = await userModel.findById(userId)
        console.log(user.creditBalance)
        if(!user || !prompt){
            return res.json({message:"Missing Details"})
        }

        if(user.creditBalance === 0 || user.creditBalance < 0){
            return res.json({message:"Not enough credit" , creditBalance: user.creditBalance})
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData , 
        {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY
            },
            responseType: 'arraybuffer',
        })


        const base64Image = Buffer.from(data , 'binary').toString('base64')

        const resultImage = `data:image/png;base64,${base64Image}`
        
        await userModel.findByIdAndUpdate(user._id, {  creditBalance: user.creditBalance - 1 })

        res.status(200).json({image: resultImage , prompt:prompt ,message: "Image Generated" , creditBalance: user.creditBalance - 1})

        // const response = await fetch(`https://api.openai.com/v1/images/generations`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        //     },
        //     body: JSON.stringify({
        //         prompt: prompt,
        //         n: 1
        //     })
        // })

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
}

export default generateImage