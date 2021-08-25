const express = require("express");
const model = require("./model");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageUpload = multer({ storage }).single("avatar");

router.get("/", async (req, res) => {
  try {
    const churchData = await model.find();
    res.status(200).json({
      message: "Found all successfully",
      data: churchData,
    });
  } catch (error) {
    res.status(404).json({
      message: "error while trying to get all",
      data: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const churchData = await model.findById(req.params.id);
    res.status(200).json({
      message: "Found successfully",
      data: churchData,
    });
  } catch (error) {
    res.status(404).json({
      message: "error while trying to get",
      data: error,
    });
  }
});

router.post("/", imageUpload, async (req, res) => {
  try {
    const churchData = await model.create({
      name: req.body.name,
      service: req.body.service,
      image: req.file.path,
    });
    res.status(200).json({
      message: "created successfully",
      data: churchData,
    });
  } catch (error) {
    res.status(404).json({
      message: "error while trying to create",
      data: error,
    });
  }
});

router.patch("/:id", imageUpload, async (req, res) => {
  try {
    const detail = {
      name: req.body.name,
      service: req.body.service,
      image: req.file.path,
    };
    const churchData = await model.findByIdAndUpdate(req.params.id, detail);
    res.status(200).json({
      message: "updated successfully",
      data: churchData,
    });
  } catch (error) {
    res.status(404).json({
      message: "error while trying to update",
      data: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const churchData = await model.findByIdAndRemove(req.params.id, req.body);
    res.status(200).json({
      message: "deleted successfully",
      data: churchData,
    });
  } catch (error) {
    res.status(404).json({
      message: "error while trying to delete",
      data: error,
    });
  }
});

module.exports = router;
