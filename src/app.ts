import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import userRoutes from "./routes/user.routes.js";

const app: Application = express();

// Middlewares globales
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);

// Ruta de estado del servidor
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

export default app;
