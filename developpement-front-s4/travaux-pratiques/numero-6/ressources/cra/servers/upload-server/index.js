const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.post("/upload", upload.single("avatar"), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
});

app.get("/uploads", function (req, res, next) {
    console.log("ffefe");
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`)
});
