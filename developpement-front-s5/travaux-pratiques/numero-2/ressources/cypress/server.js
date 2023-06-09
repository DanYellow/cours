const express = require("express");

const app = express();
app.use(express.static('src'))


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/form.html");
}); 

app.listen(3000, () => {
  console.log("Server is running on http::/localhost:3000");
});