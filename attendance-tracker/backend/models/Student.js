const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    status: { type: String, enum: ["present", "absent"], default: "present" },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
