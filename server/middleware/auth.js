import jwt from 'jsonwebtoken'


const userAuth = async (req , res , next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({message: 'Not Authorized , Login again'});
    }

    try{
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecoded){
            req.body.userId = tokenDecoded.userId;
        }else{
            return res.json({message: 'Not Authorized , Login again'});
        }
        next();

    }catch(error){
        res.json({message: 'Not Authorized , Login again'});
    }
 
}

export default userAuth;