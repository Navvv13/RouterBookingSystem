import jsonwebtoken from "jsonwebtoken";


const auth = (req,res,next) =>{
    const token = req.header('token');
    if(!token) return res.send({
        "success":false,
        "message":"access denied"

    })

    try{
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.send({
            "success":false,
            "message":"Invalid Token"
        })
    }
}

export {
    auth as Authorizer
}