const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// 🎯 1. 生徒を追加するAPI（POST /students）
router.post("/", async (req, res) => {
    try {
        const { name, studentId, status } = req.body;
        const newStudent = new Student({ name, studentId, status });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🎯 2. 生徒一覧を取得するAPI（GET /students）
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🎯 3. 生徒情報を更新するAPI（PUT /students/:id）
router.put("/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,  // リクエストボディから更新内容を取得
            { new: true }  // 更新後のデータを返す
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "生徒が見つかりません" });
        }
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: "エラーが発生しました", error });
    }
});

// 🎯 4. 生徒を削除するAPI（DELETE /students/:id）
router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "生徒が見つかりません" });
        }
        res.json({ message: "生徒が削除されました", student: deletedStudent });
    } catch (error) {
        res.status(500).json({ message: "エラーが発生しました", error });
    }
});

module.exports = router;