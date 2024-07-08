import { KeyedMutator } from "swr";

export interface IItem {
	id: string;
	name: string;
}

export interface IList {
	id: string;
	name: string;
	items: IItem[];
}

export interface IBoard {
	id: string;
	name: string;
	lists: IList[];
}

export interface IAppData {
	boards: IBoard[];
}

export interface IColumnProps {
	id: number | string;
	title: string;
	tasks: string[];
	mutate: KeyedMutator<IBoard>;
}
