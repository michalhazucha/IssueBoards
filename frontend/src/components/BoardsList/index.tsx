import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/constants";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { postRequest } from "../../config/fetcher";
import { IBoard } from "../../config/interfaces";
import Loader from "../Loader";

const BoardSList = () => {
	const { data: boards, isLoading } = useSWR(`${API_URL}/boards`);
	const { trigger } = useSWRMutation(`${API_URL}/boards`, postRequest);
	const [name, setName] = useState("");
	const createBoard = async () => {
		console.log("We are creating new board");
		await trigger({ name });
		await setName("");
	};

	return (
		<div className="flex flex-col items-start px-6 bg-blue-400 min-h-screen">
			<h1 className="text-4xl font-bold my-8">Homepage</h1>
			<Loader isLoading={isLoading}>
				<div className="flex space-x-4">
					{boards?.map((board: IBoard) => (
						<Link
							key={board.id}
							to={`/board/${board.id}`}
							className="bg-teal-500 text-black py-2 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition"
						>
							{board.name}
						</Link>
					))}

					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="..."
						className="p-2 border border-gray-300 rounded-md"
					/>
					<button
						onClick={createBoard}
						className="bg-white text-teal-500 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition"
					>
						Create Board
					</button>
				</div>
			</Loader>
		</div>
	);
};

export default BoardSList;
