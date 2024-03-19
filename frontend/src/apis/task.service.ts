import axios from "axios";
import { Task } from "./models/Task";

const API_URL = import.meta.env.VITE_API_URL;

const getTasks = async () => {
	const res = await axios.get(`${API_URL}/tasks`);
	return res.data;
};

const postTask = async (task: Task) => {
	const res = await axios.post(`${API_URL}/tasks`, task);
	return res.data;
};

const getTaskWithId = async (id: number) => {
	const res = await axios.get(`${API_URL}/tasks/${id}`);
	return res.data;
};

const updateTask = async (id: number, task: Task) => {
	const res = await axios.post(`${API_URL}/tasks/${id}`, task);
	return res.data;
};

const deleteTask = async (id: number) => {
	const res = await axios.delete(`${API_URL}/tasks/${id}`);
	return res.data;
};

const TaskService = {
	getTasks,
	postTask,
	getTaskWithId,
	updateTask,
	deleteTask,
};

export default TaskService;
