import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRouter from "./router/user.router.js";
import categoryRouter from "./router/category.router.js";
import productRouter from "./router/product.router.js";
import cartRouter from "./router/card.router.js";
import router from "./router/dashbord.router.js";

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/card", cartRouter);
app.use("/api/admin", router);

// React Build
const __dirname = path.resolve();

app.use(
    express.static(
        path.join(__dirname, "Backend/public")
    )
);

app.get("/{*any}", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "Backend/public",
            "index.html"
        )
    );
});

export default app;