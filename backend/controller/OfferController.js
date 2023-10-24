const offerSchema = require("../models/OfferSchema");
const RevisionSchema = require("../models/OfferRevisionSchema");
const projectSchema = require("../models/projectSchema");

exports.newOffer = async (req, res) => {
  try {
    const offer = await offerSchema.create(req.body);
    const revision = await RevisionSchema.create({
      project_id: req.body.project_id,
      offer_id: offer._id,
    });

    res.status(200).json({
      message: "Offer added successfully.",
      data: offer,
      revision: revision,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding offer",
      data: err,
    });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const offers = await offerSchema
      .find({
        status: { $in: ["not Final", "ongoing"] }, // Use $in to match multiple values
      })
      .populate("project_id")
      .populate("client_id")
      .exec();
    res.status(200).json({
      message: "Offers fetched successfully.",
      data: offers,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding offer",
      data: err,
    });
  }
};

exports.updateOfferStatus = async (req, res) => {
  try {
    const offer = await offerSchema.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (offer.status === "Final") {
      const project = await projectSchema.findById(offer.project_id);
      project.is_finalized = true;
      project.total_price += offer.price;
      project.save();
    }
    if (offer.status === "not Final") {
      const project = await projectSchema.findById(offer.project_id);

      project.total_price -= offer.price;
      project.save();
    }
    res.status(200).json({
      message: "Offer status updated successfully.",
      data: offer,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating offer status",
      data: err,
    });
  }
};
exports.getOneOffer = async (req, res) => {
  try {
    const offer = await offerSchema
      .findById(req.params.id)
      .populate("project_id")
      .populate("client_id")
      .populate({
        path: "panels_to_be_created.parts.components",
        model: "offercomponent",
        populate: {
          path: "sub_components",
          model: "offersubcomponent",
          populate: {
            path: "company.company_name",
            model: "Companies",
          },
        },
      })
      .exec();

    res.status(200).json({
      message: "Offer fetched successfully.",
      data: offer,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching offer",
      data: err,
    });
  }
};

exports.getFinalOffers = async (req, res) => {
  try {
    const offers = await offerSchema
      .find({
        status: "Final",
        project_id: req.body.project_id,
      })
      .populate("project_id")
      .populate("client_id")
      .populate({
        path: "panels_to_be_created.parts.components",
        model: "offercomponent",
        populate: {
          path: "sub_components",
          model: "offersubcomponent",
          populate: {
            path: "company.company_name",
            model: "Companies",
          },
        },
      })
      .exec();
    res.status(200).json({
      message: "Offers fetched successfully.",
      data: offers,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in adding offer",
      data: err,
    });
  }
};
