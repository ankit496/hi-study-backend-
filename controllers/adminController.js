const {getInstructorTickets,verifyTicket}=require('../repository/adminRepo')
const getInstructorRequests=async(req,res)=>{
    try{
        const tickets=await getInstructorTickets();
        if(tickets.success){
            return res.status(200).json(tickets)
        }
    }
    catch(error){
        next(error)
    }
}
const verifyInstructorTicket=async(req,res)=>{
    try{
        const {id}=req.params;
        const {operation}=req.body;
        const response=await verifyTicket(id,operation);
        return res.status(response.status_code).json({success:response.success,message:response.message});
    }
    catch(error){
        next(error)
    }
}
module.exports={
    getInstructorRequests,
    verifyInstructorTicket
}