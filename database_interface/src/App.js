import { SearchPage } from "./SearchPage";
import { DataPage } from "./DataPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SearchPage />} />
					<Route path="/search" element={<DataPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
