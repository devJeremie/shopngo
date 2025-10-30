import express from "express";
import "dotenv/config";
import cors from "cors";
import checkout from "./routes/checkout.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("eheh on est bon");
});
app.use("/",checkout)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})