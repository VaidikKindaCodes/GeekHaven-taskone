import express from "express";
import User from "../models/user.js";
import Question from "../models/question.js";
import Category from "../models/category.js";

const router = express.Router();

router.post("/bookmark", async (req, res) => {
  try {
    const { questionId, userId } = req.body;

    const ques = await Question.findById(questionId);
    if (!ques) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    await User.updateOne(
      { _id: userId },
      { $addToSet: { BookmarkQuestions: ques._id } }
    );

    return res.json({
      success: true,
      message: "Question added to Bookmarked",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/fetchdata", async (req, res) => {
  try {
    const data = await Category.find().populate("questions");

    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching data",
    });
  }
});

export default router;
