import "./index.css";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import BoardsList from "./components/BoardsList";
import Board from "./components/Board";
import { SWRConfig } from "swr";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<BoardsList />} />
			<Route path="/board/:id" element={<Board />} />
		</>
	)
);

function App() {
	return (
		<SWRConfig
			value={{
				refreshInterval: 3000000,
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()),
			}}
		>
			<RouterProvider router={router} />
		</SWRConfig>
	);
}
export default App;
