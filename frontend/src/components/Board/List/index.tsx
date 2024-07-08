import { useState } from "react";
import { API_URL } from "../../../config/constants";
import { postRequest } from "../../../config/fetcher";
import useSWRMutation from "swr/mutation";
import { IListProps } from "../../../config/interfaces";
import Loader from "../../Loader";
import Item from "../Item";

const List = ({ id, title, tasks, mutate }: IListProps) => {
	const [text, setText] = useState("");

	const onSubmitFunc = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			await e.preventDefault();
			text?.length > 0 && (await trigger({ name: text }));
			await mutate();
			await setText("");
		} catch (error) {
			alert(error);
		}
	};

	const { trigger, isMutating } = useSWRMutation(
		`${API_URL}/lists/${id}/items`,
		postRequest
	);
	return (
		<div className="bg-white p-4 rounded shadow-md w-1/3">
			<h3 className="text-lg font-bold mb-4">{title ?? ""}</h3>
			<div className="space-y-2">
				{tasks.map((task: string, index: number) => (
					<Item text={task} key={index} />
				))}
				<form className="flex flex-row w-full" onSubmit={onSubmitFunc}>
					<input
						value={text}
						type="text"
						className="border border-teal-500 rounded p-2 w-full"
						placeholder="Type text here"
						onChange={(e) => setText(e.target.value)}
					/>

					<Loader isLoading={isMutating} size={20}>
						<input
							type="submit"
							className="border-teal-500 bg-teal-500 text-white p-2 rounded ml-2 cursor-pointer"
							value={"Add"}
						/>
					</Loader>
				</form>
			</div>
		</div>
	);
};
export default List;
