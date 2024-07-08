import type { ILoaderProps } from "../../config/interfaces";
import { ImSpinner3 } from "react-icons/im";

const Loader = ({ isLoading, children, size = 20 }: ILoaderProps) => {
	return (
		<div className="relative">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
					<ImSpinner3 size={20} className="animate-spin" />
				</div>
			)}
			{children && (
				<div className={`${isLoading ? "opacity-50" : ""}`}>{children}</div>
			)}
			{!children && isLoading && (
				<div className="flex items-center justify-center p-8">
					<ImSpinner3 size={size} className="animate-spin" />
				</div>
			)}
		</div>
	);
};
export default Loader;
