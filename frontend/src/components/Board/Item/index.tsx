import type { IItemProps } from '../../../config/interfaces';

const Item = ({ text, index }: IItemProps) => {
	return <div key={index} className="bg-teal-500 text-white p-2 rounded">
	{text}
</div>;
};

export default Item;
