const complete=require('../models/projectCompleteDetails')
const projectSchema=require('../models/projectSchema')

module.exports.updateOrCreate=(async(req,res)=>{
    try {
        console.log(req.body);
        await complete
          .findOneAndUpdate({projectId:req.body?.projectId},
            { $set:req.body },
            { upsert: true }
          )
          .exec();
        await projectSchema.findByIdAndUpdate(req.body?.projectId,{finished:true})
        res.status(200).json({ message: "Stored succesfully" });
      } catch (err) {
        res.status(500).json({
          message: "Error in adding store",
          data: err,
        });
      }
})

module.exports.projectFinish=(async(req,res)=>{
    try{
        await projectSchema.findByIdAndUpdate(req.body?.projectId,{finished:true})
        res.status(200).json({ message: "Updated succesfully" });
    }
    catch (err) {
        res.status(500).json({
          message: "Error in Updating Project",
          data: err,
        });
      }
})