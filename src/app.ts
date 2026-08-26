import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import bookRoutes from "./routes/user.routes.js";
import { logger } from "./middleware/logger.middleware.js"

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/books", bookRoutes)


export default app;
