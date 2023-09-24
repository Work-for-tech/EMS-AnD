const drawingSchema = require("../models/drawingSchema");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // destination:'../uploads',
  destination: "..\\Uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload1 = multer({
  storage: storage,
}).single("file");

// DeOkumar
module.exports.getDrawingFile = (req, res) => {
  const fileName = req.body.fileName;
  const filePath = path.join(__dirname, "../../Uploads", fileName);

  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
  res.setHeader("Content-Type", "application/octet-stream");

  res.sendFile(filePath);
};

module.exports.addDrawing = (req, res) => {
  try {
    upload1(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: "Some error occuerd" });
      } else {
        if (req.file == undefined) {
          res.status(400).json({ message: "Some Error Occured" });
        } else {
          req.body.drawingPath = req.file.path;
          var updated = await drawingSchema
            .updateMany(
              { clientId: req.body.clientId, projectId: req.body.projectId },
              { current: false }
            )
            .sort({ _id: -1 })
            .skip(1)
            .exec();

          drawingSchema
            .create(req.body)
            .then(async (data) => {
              res.status(200).json({ message: "File uploaded", data: data });
            })
            .catch((error) => {
              res
                .status(400)
                .json({ message: "File not uploaded", error: error });
            });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getDrawing = (req, res) => {
  try {
    var projectId = req.params.projectId;
    var clientId = req.params.clientId;
    drawingSchema
      .find({ clientId: clientId, projectId: projectId, current: false })
      .populate("clientId")
      .populate("projectId")
      .then(async (data) => {
        var current = await drawingSchema
          .find({
            clientId: clientId,
            projectId: projectId,
            current: true,
          })
          .populate("clientId")
          .populate("projectId");
        res
          .status(200)
          .json({ message: "File uploaded", past: data, current: current });
      })
      .catch((error) => {
        res.status(400).json({ message: "File not uploaded", error: error });
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
