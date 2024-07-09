import type { IBoard } from "../../config/interfaces";
import { useState } from "react";
import { API_URL, ButtonVariant } from "../../config/constants";
import useSWR from "swr";
import List from "./List";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { postRequest } from "../../config/fetcher";
import Button from "../Button";

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
		if (listName?.length > 2) {
			await trigger({ name: listName });
			await mutateData();
		}
	};

	return (
		<div className="p-4 mb-2 bg-blue-400 min-h-screen">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div className="m-auto md:ml-0">
					<Link
						className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition h-10 w-fit"
						to="/"
					>
						{"<"} Boards
					</Link>
				</div>

				<h2 className="text-4xl font-bold text-center">{data?.name}</h2>
				<div className="m-auto md:mr-0">
					<input
						value={listName}
						onChange={(e) => setListName(e.target.value)}
						className="p-2 border border-gray-300 rounded-md"
					/>
					<Button
						disabled={listName?.length < 3}
						onClick={createList}
						variant={ButtonVariant.dark}
					>
						+ add new list
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
				{data?.lists?.map((list) => (
					<List
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
