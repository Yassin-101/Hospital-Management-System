

// api for adding doctor
const addDoctor = async(req,res)=>{
    try {
       const {name,email,password,speciality,degree,experiance,about,fees,address} = req.body 
    } catch (error) {
        
    }
}

module.exports = {addDoctor}