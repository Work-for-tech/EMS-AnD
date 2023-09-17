const offerprojectSchema = require('../models/offer_projectSchema')

exports.add = async (req, res) => {

    try {
        const offer_project = await offerprojectSchema.create(req.body)
        res.status(200).json({
            message: "offer_project added successfully.",
            data: offer_project
        })
    } catch (err) {
        response.status(500).json({
            message: "Error in adding offer_project",
            data: err
        })
    }
}