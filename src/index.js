const express = require('express');
const app = express();

const postsRouter = require("./routes/posts"); 

// Middleware to parse JSON bodies (will be useful in later steps)
app.use(express.json());
app.use("/api/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({msg: "Not found"});
});


// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
