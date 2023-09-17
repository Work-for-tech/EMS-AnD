// Here
const RevisionSchema = require("../models/OfferRevisionSchema");
const OfferSchema = require("../models/OfferSchema");
const clientSchema = require("../models/clientSchema");
const projectSchema = require("../models/projectSchema");
exports.getRevision = async (req, res) => {
  try {
    const revision = await RevisionSchema.findOne({
      offer_id: req.body.offer_id,
    })
      .populate("offer_id")
      .populate("project_id")
      .exec();

    res.status(200).json({
      message: "Revision fetched successfully.",
      data: revision,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching Revision",
      data: err,
    });
  }
};

exports.updateRevision = async (req, res) => {
  try {
    const offer = await OfferSchema.findById(req.params.id);

    const revision = await RevisionSchema.findOne({ offer_id: req.params.id });

    const client = await clientSchema.findOne({ name: req.body.client_id });

    const project = await projectSchema.findOne({
      project_name: req.body.project_id,
    });

    const offerBeforeRevision = JSON.parse(JSON.stringify(offer));

    revision.revisions.push({
      Date: Date.now(),
      data_before_revision: offerBeforeRevision,
    });

    revision.save();

    offer.project_id = project._id;
    offer.client_id = client._id;
    offer.description_of_panel = req.body.description_of_panel;
    offer.Qty_of_panel = req.body.qty_of_panel;
    offer.panels_to_be_created = req.body.panels_to_be_created;
    offer.price = req.body.price;
    offer.save();

    res.status(200).json({
      message: "Revision updated successfully.",
      data: revision,
      offer: offer,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating Revision",
      data: err,
    });
  }
};
