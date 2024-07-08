import { useState } from "react";
import { API_URL } from "../../config/constants";
import useSWR from "swr";
import Column from "./Coolumn";
import { useParams } from "react-router";
import { IBoard } from "../../config/interfaces";
import { Link } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { postRequest } from "../../config/fetcher";

const Board = () => {
	const { id } = useParams();
	const { data, mutate: mutateData } = useSWR<IBoard>(
		`${API_URL}/boards/${id}`
	);
	const { trigger } = useSWRMutation(
		`${API_URL}/boards/${id}/lists`,
		postRequest
	);
	const [listName, setListName] = useState("");
	const createList = async () => {
		await trigger({ name: listName });
		await mutateData();
	};

	return (
		<div className="p-4 mb-2 bg-blue-400 min-h-screen">
			<div className="flex flex-row justify-between ">
				<Link
					className="bg-teal-500 text-white font-bold ck py-2 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition h-10"
					to="/"
				>
					{"<"} Boards
				</Link>
				<h2 className="text-4xl font-bold text-center mb-8 ">{data?.name}</h2>
				<div>
					<input
						value={listName}
						onChange={(e) => setListName(e.target.value)}
						className="p-2 border border-gray-300 rounded-md"
					/>
					<button
						className="bg-teal-500 text-white font-bold ck py-2 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition h-10"
						onClick={createList}
					>
						+ add new list
					</button>
				</div>
			</div>
			<div className="flex space-x-4">
				{data?.lists?.map((list) => (
					<Column
						title={list?.name}
						tasks={list?.items?.map((item) => item?.name)}
						id={list?.id}
						mutate={mutateData}
					/>
				))}
			</div>
		</div>
	);
};

export default Board;
