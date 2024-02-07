const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./db");
const cors = require("cors"); // Import the CORS middleware

connectDB(); // calling db method to initiate connection

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the CORS middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// Additional error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(express.json());
app.use("/api", require("./routes/books"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
