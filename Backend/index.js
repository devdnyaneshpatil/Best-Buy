const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const productRouter = require("./routes/product.routes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/products",productRouter)
app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port:-${process.env.PORT}`);
});