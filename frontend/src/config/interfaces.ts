import { ReactNode } from 'react';
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

export interface IListProps {
	id: number | string;
	title: string;
	tasks: string[];
	mutate: KeyedMutator<IBoard>;
}

export type TVariant = "light" | "dark";

export interface IButtonProps{
  onClick: () => void;
  disabled: boolean;
  variant: TVariant;
  children:ReactNode[]|string
}

export interface IItemProps{
	text: string,
	index: string | number
}

export interface ILoaderProps {
	isLoading: boolean;
	size?: number;
	children?: ReactNode | ReactNode[];
}