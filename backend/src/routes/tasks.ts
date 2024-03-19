import { Router, Request, Response } from "express";
import { Task } from "../models/task";

const router = Router();
let tasks: Task[] = [];

//create a task
router.post("/", (req: Request, res: Response) => {
	const task: Task = {
		id: tasks.length + 1,
		title: req.body.title,
		description: req.body.description,
		completed: false,
	};

	tasks.push(task);
	res.status(201).json(task);
});

//get all tasks
router.get("/", (req: Request, res: Response) => {
	res.json(tasks);
});

//delete a task
router.delete("/:id", (req: Request, res: Response) => {
	tasks = tasks.filter((task) => task.id !== parseInt(req.params.id));
	res.status(204).json();
});

//update a task
router.post("/:id", (req: Request, res: Response) => {
	const task = tasks.find((task) => task.id === parseInt(req.params.id));

	if (!task) {
		res.status(404).json({ message: "Task not found" });
	} else {
		task.title = req.body.title;
		task.description = req.body.description;
		task.completed = req.body.completed;
		res.json(task);
	}
});

//get a task
router.get("/:id", (req: Request, res: Response) => {
	const task = tasks.find((task) => task.id === parseInt(req.params.id));

	if (!task) {
		res.status(404).json({ message: "Task not found" });
	} else {
		res.json(task);
	}
});

export default router;
