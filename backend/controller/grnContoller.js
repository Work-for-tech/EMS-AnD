const grnSchema = require("../models/grnSchema");
const multer = require("multer");

// // Configure file storage using multer
const storage = multer.diskStorage({
  destination: "../Uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array(["pics"]);

// Controller to create a new GRN record with two picture uploads
exports.createGrn = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      try {
        if (err) {
          console.log("error message ", err);
          res.status(400).json({
            error: err,
            message: "Internal Server Error",
          });
        } else {
          const { invoice_number, received_date, vender_id } = req.body;
          console.log("mckdmcdkmmdc", req.files);
          const truckPicUrl = req.files[0].path;
          const billPicUrl = req.files[1].path;

          const grn = new grnSchema({
            invoice_number,
            received_date,
            vender_id,
            truck_pic_url: truckPicUrl,
            bill_pic_url: billPicUrl,
          });

          const savedGrn = await grn.save();

          return res.status(201).json({
            message: "GRN Created successfully!!!",
            grn: savedGrn,
          });
        }
      } catch (err) {
        console.log("error message ", err);
        return res.status(500).json({
          error: err,
          message: "Internal Server Error",
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Internal Server Error",
    });
  }
};

// Controller to get all GRN records
exports.getGrns = async (req, res) => {
  try {
    const grns = await grnSchema.find().populate("vender_id");
    return res.status(200).json({
      message: "GRNs fetched successfully!!!",
      grns: grns,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Internal Server Error",
    });
  }
};
