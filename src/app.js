const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const memberRoutes = require("./routes/memberRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/book", bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
