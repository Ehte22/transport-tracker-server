import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path"
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import vehicleRoutes from "./routes/vehicle";
import locationRoutes from "./routes/location";
import routeRoutes from "./routes/route";
import alertRoutes from "./routes/alert";
import deviceRoutes from "./routes/device";

dotenv.config();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static("dist-frontend"))

// const __dirnamePath = path.resolve();
// const frontendPath = path.join(__dirnamePath, "dist-frontend");

// Serve static frontend files
// app.use(express.static(frontendPath));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicle", vehicleRoutes);
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/route", routeRoutes);
app.use("/api/v1/alert", alertRoutes);
app.use("/api/v1/device", deviceRoutes);

// app.get("/", (req, res) => res.json({ ok: true, msg: "Transport Tracker API" }));

// SPA fallback (React/Vite/Angular)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist-frontend", "index.html"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Something went wrong", error: err.message });
})

export default app;
