const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    let token = req.header('auth-token')
    if(!token || !token.startsWith('Bearer')){
        return res.status(401).send('Acces denied')
    }
    
    try{
        token = token.split(' ')[1]
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified;
        next()
    }catch(err){
        res.status(400).send('invalid token')
    } 
    
}

module.exports = auth