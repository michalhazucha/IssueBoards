import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(cors());

app.use(express.json());

interface Item {
	id: string;
	name: string;
}

interface List {
	id: string;
	name: string;
	items?: Item[];
}

interface Board {
	id: string;
	name: string;
	lists?: List[];
}

interface Data {
	boards: Board[];
}

let data: Data = JSON.parse(fs.readFileSync("data/data.json", "utf-8"));

// Get all boards
app.get("/api/boards", (req, res) => {
	res.json(data.boards);
});

// Get board by ID
app.get("/api/boards/:id", (req, res) => {
	const board = data?.boards.find((board) => board.id === req.params.id);
	if (board) {
		res.json(board);
	} else {
		res.status(404).send("Board not found");
	}
});

// Create a new board
app.post("/api/boards", (req, res) => {
	const newBoard: Board = {
		id: uuidv4(),
		name: req.body.name ?? "next Board",
		lists: [
			{
				id: uuidv4(),
				name: "TODO",
				items: [],
			},
			{
				id: uuidv4(),
				name: "In Progress",
				items: [],
			},
			{
				id: uuidv4(),
				name: "Done",
				items: [],
			},
		],
	};
	data.boards.push(newBoard);
	fs.writeFileSync("data/data.json", JSON.stringify(data, null, 2));
	res.json(newBoard);
});

// Create a new list in a board
app.post("/api/boards/:id/lists", (req, res) => {
	const board = data.boards.find((board) => board?.id === req.params.id);
	if (board) {
		if (!board.lists) {
			board.lists = [];
		}
		const newList: List = {
			id: uuidv4(),
			name: req.body.name,
			items: [],
		};
		board.lists.push(newList);
		fs.writeFileSync("data/data.json", JSON.stringify(data, null, 2));
		res.json(newList);
	} else {
		res.status(404).send("Board not found");
	}
});

// Create a new item in a list
app.post("/api/lists/:listId/items", (req, res) => {
	let list: List | undefined;

	data.boards.forEach((board) => {
		const foundList = board.lists?.find(
			(list) => list.id === req.params.listId
		);
		if (foundList) {
			list = foundList;
		}
	});

	if (list) {
		if (!list.items) {
			list.items = [];
		}
		const newItem: Item = {
			id: uuidv4(),
			name: req.body.name,
		};
		list.items.push(newItem);
		fs.writeFileSync("data/data.json", JSON.stringify(data, null, 2));
		res.json(newItem);
	} else {
		res.status(404).send("List not found");
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
