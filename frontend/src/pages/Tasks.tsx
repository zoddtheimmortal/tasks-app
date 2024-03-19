import { Component, createEffect, createSignal } from "solid-js";
import styles from "../App.module.css";
import TaskService from "../apis/task.service";
import { Task } from "../apis/models/Task";
import { A } from "@solidjs/router";

const Tasks: Component<{}> = (props) => {
	const [tasks, setTasks] = createSignal<Task[]>([]);

	createEffect(() => {
		const taskGetter = async () => {
			const res = await TaskService.getTasks();
			setTasks(res);
		};
		taskGetter();
	});

	const postTask = async (e: Event) => {
		e.preventDefault();
		const title = (document.getElementById("title") as HTMLInputElement)
			.value;
		const description = (
			document.getElementById("description") as HTMLInputElement
		).value;
		const task: Task = {
			id: 0,
			title,
			description,
		};
		const res = await TaskService.postTask(task);
		setTasks([...tasks(), res]);
	};

	const updateTask = async (id: number, task: Task) => {
		task.completed = !task.completed;
		const res = await TaskService.updateTask(id, task);
		setTasks([...tasks().map((t) => (t.id === id ? res : t))]);
	};

	const deleteTask = async (id: number) => {
		const res = await TaskService.deleteTask(id);
		setTasks([...tasks().filter((t) => t.id !== id)]);
	};

	return (
		<>
			<div class={styles.App}>
				<header class={styles.header}>
					<code>
						<A href="/">t a s k s . p a g e</A>
					</code>
					<form
						action=""
						class="m-3 px-3 py-3 rounded-xl bg-gray-700 border-2 border-gray-500"
						onSubmit={postTask}
					>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Enter Title"
							class="mx-1 px-2 py-1 rounded-xl border-2 border-gray-400 text-gray-700"
						/>
						<input
							type="text"
							name="description"
							id="description"
							placeholder="Enter Description"
							class="mx-1 px-2 py-1 rounded-xl border-2 border-gray-400 text-gray-700"
						/>
						<input
							type="submit"
							value="Create Task"
							class="px-2 py-1 text-gray-700 mx-1 rounded-xl bg-emerald-400 hover:bg-emerald-500 "
						/>
					</form>
					<div class="grid grid-cols-3 gap-2 py-2 m-3 mx-5">
						{tasks().map((task) => (
							<div class="border rounded-xl p-3 px-5">
								<h1 class="font-bold text-3xl">{task.title}</h1>
								<p>
									<span class="font-semibold">
										Description:
									</span>{" "}
									{task.description}
								</p>
								<code onClick={() => updateTask(task.id, task)}>
									<span class="font-semibold">Status:</span>{" "}
									<span
										class={
											task.completed
												? "text-emerald-400"
												: "text-red-400"
										}
									>
										{task.completed ? "Yes" : "No"}
									</span>
								</code>
								<div
									onClick={() => deleteTask(task.id)}
									class="font-semibold px-2 py-1 text-gray-700 mx-1 rounded-xl bg-blue-400 hover:bg-blue-500 "
								>
									Delete Task
								</div>
							</div>
						))}
					</div>
				</header>
			</div>
		</>
	);
};

export default Tasks;
