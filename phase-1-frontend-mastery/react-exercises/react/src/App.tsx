import { BrowserRouter, Routes, Route, Link } from 'react-router';
import './App.css'
import Counter from './react-exercises/Counter'
import Inbox from './react-exercises/Inbox'
import PropertyPage from './react-exercises/PropertySearch';
import Stopwatch from './react-exercises/Stopwatch';

function Path({ route }: { route: string }) {
	return (
		<>
			<h1 className="relative">{route !== "Home" ? route : "My first React project"}</h1>
			{route !== "Home" && <Link to="/" className="z-99 corsor-pointer text-left absolute ml-4 mt-6">Back to home</Link>}

			{route === "Home" &&
				<div className="flex-col gap-2 flex mt-4">
					<h2>My projects</h2>
					<Link to="/counter">Counter</Link>
					<Link to="/inbox">Inbox</Link>
					<Link to="/property">Property search</Link>
					<Link to="/stopwatch">Stopwatch</Link>
				</div>
			}
			{route === "Counter" && <Counter />}
			{route === "Inbox" && <Inbox />}
			{route === "Property Search" && <PropertyPage />}
			{route === "Stopwatch" && <Stopwatch />}
		</>
	)
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Path route="Home" />} />
				<Route path="/counter" element={<Path route="Counter" />} />
				<Route path="/inbox" element={<Path route="Inbox" />} />
				<Route path="/property" element={<Path route="Property Search" />} />
				<Route path="/stopwatch" element={<Path route="Stopwatch" />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
