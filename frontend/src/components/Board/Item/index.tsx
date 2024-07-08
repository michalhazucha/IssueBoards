import type { IItemProps } from '../../../config/interfaces';

const Item = ({ text, key }: IItemProps) => {
	return <div key={key} className="bg-teal-500 text-white p-2 rounded">
	{text}
</div>;
};

export default Item;
