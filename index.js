import express from "express";
import cors from "cors";
import EventRouter from "./src/controllers/event-controller.js";
import ProvinceRouter from "./src/controllers/province-controller.js";
import EventCategoryRouter from "./src/controllers/event-category-controller.js";
import LocationRouter from "./src/controllers/location-controller.js";
import UserRouter from "./src/controllers/user-controller.js";
import EventLocationRouter from "./src/controllers/event-location-controller.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/event", EventRouter)
app.use("/api/province", ProvinceRouter);
app.use("/api/event_category", EventCategoryRouter);
app.use("/api/location", LocationRouter);
app.use("/api/user", UserRouter);
app.use("/api/event_location", EventLocationRouter);

app.listen(port, () => {
    console.log(`"server" Listening on port ${port}`);
})