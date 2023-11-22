const prodSchema=require('../models/productionSchema')

module.exports.add=((req,res)=>{
    try{
        console.log(req.body)
        prodSchema.create(req.body).then((data)=>{
            res.status(200).json({message:"Progress Updated",data:data})
        }).catch((error)=>{
            res.status(400).json({message:"Progress fail to Update",error:error})
        })
    }
    catch (err) {
        response.status(500).json({
          message: "Something went wrong",
          data: err,
        });
      }
})

module.exports.get=((req,res)=>{
    try{
        prodSchema.find({projectId:req.params.projectId}).then((data)=>{
            res.status(200).json({message:"Project's Progress Found",data:data})
        }).catch((error)=>{
            res.status(400).json({message:"Progress fail to Found",error:error})
        })
    }
    catch (err) {
        response.status(500).json({
          message: "Something went wrong",
          data: err,
        });
      }
})

module.exports.update=((req,res)=>{
    try{
        prodSchema.findByIdAndUpdate(req.params.id,{$set:req.body}).then((data)=>{
            res.status(200).json({message:"Progress updated",data:data})
        }).catch((error)=>{
            res.status(400).json({message:"Progress fail to update",error:error})
        })
    }
    catch (err) {
        response.status(500).json({
          message: "Something went wrong",
          data: err,
        });
      }
})