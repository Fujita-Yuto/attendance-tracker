const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB接続
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ MongoDBに接続成功");
}).catch((err) => {
    console.error("❌ MongoDB接続エラー:", err);
});

// ルート設定
const studentRoutes = require("./routes/students");
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.send("出席管理アプリのAPI");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 サーバー起動: http://localhost:${PORT}`);
});
