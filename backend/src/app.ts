import express, { Request, Response } from "express";
import taskRoutes from "./routes/tasks";
import * as middlewares from "./middleware";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
	res.send("Express on Vercel");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

export default app;
