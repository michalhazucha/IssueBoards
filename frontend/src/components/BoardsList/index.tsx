import type { IBoard } from "../../config/interfaces";
import { useState } from "react";
import { API_URL, ButtonVariant } from "../../config/constants";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { postRequest } from "../../config/fetcher";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Button from "../Button";

const BoardSList = () => {
	const { data: boards, isLoading } = useSWR(`${API_URL}/boards`);
	const { trigger } = useSWRMutation(`${API_URL}/boards`, postRequest);
	const [name, setName] = useState("");

	const createBoard = async () => {
		console.log("We are creating new board");
		await trigger({ name });
		setName("");
	};

	return (
		<div className="flex flex-col items-between px-6 bg-blue-400 min-h-screen">
			<h1 className="text-4xl font-bold my-8 text-center md:text-start ">
				Homepage
			</h1>
			<Loader isLoading={isLoading}>
				<div className="flex flex-col-reverse md:grid md:grid-cols-6 gap-6">
					<div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{boards?.map((board: IBoard) => (
							<Link
								key={board.id}
								to={`/board/${board.id}`}
								className="bg-teal-500 text-black p-4 rounded-lg shadow-lg hover:bg-teal-600 transition"
							>
								{board.name}
							</Link>
						))}
					</div>
					<div className="col-span-2 flex flex-col gap-4 items-center md:items-start justify-center md:flex-row md:mx-auto">
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter board name"
							className="p-2 border border-gray-300 rounded-md"
						/>
						<Button
							disabled={name?.length < 3}
							onClick={createBoard}
							variant={ButtonVariant.light}
						>
							Create Board
						</Button>
					</div>
				</div>
			</Loader>
		</div>
	);
};

export default BoardSList;
