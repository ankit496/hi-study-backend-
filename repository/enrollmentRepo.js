const Courses=require('../models/Courses')
const User=require('../models/User')
const buyCourseRepo=async(cartItems,id)=>{
    const user=await User.findById(id)
    for(let i=0;i<cartItems.length;i++){
        const course=await Courses.findById(cartItems[i].id)
        console.log(user,course)
        user.courses_bought.push(cartItems[i].id)
        course.enrolledUser.push(id)
        await course.save()
        await user.save()
    }
    return {success:true,data:"Successfully bought courses"};
}
module.exports={
    buyCourseRepo
}