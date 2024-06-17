import jwt from "jsonwebtoken"

 const validateToken = (req,res,next) => {
   
    if (req.headers?.authorization?.split(" ")[1]) {
        const token = req.headers?.authorization?.split(" ")[1];
    try{
        const currentTimestamp = Date.now();
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.decodedEmail = verified.email
        req.decodedUsername = verified.username
        // if(!isNextTimestampWithinAWeek(currentTimestamp, verified.timeStamp)){
        //     return res.status(201).json({success: false, reason: "token"})
        // } 
        next();
    }catch(err){
        
        return res.status(201).json({success: false, reason: "token"})
    }
    } else {
        
        return res.status(201).json({success: false,reason: "token"})
    }
}

function isNextTimestampWithinAWeek(currentTimestamp, prevTimestamp) {
    prevTimestamp = prevTimestamp + 7 * 24 * 60 * 60 * 1000;
  
    if (currentTimestamp <= prevTimestamp) {
      return true;
    } else {
      return false;
    }
  }
export default validateToken
