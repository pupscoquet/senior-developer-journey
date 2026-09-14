import { useState } from "react";

export default function Counter() {
	const [count, setCount] = useState(0);
	let [showError, setShowError] = useState(false);

	function increaseCount() {
		setCount(count + 1);
		setShowError(showError = false);
	}

	function decreaseCount() {
		if (count === 0) {
			setShowError(showError = true);
		} else {
			setCount(count - 1);
		}
	}

	function resetCount() {
		setCount(0);
		setShowError(showError = false);
	}

	return (
		<>
			<span>
				<button onClick={decreaseCount} className="bg-gray-300 px-2 py-1 rounded-sm text-gray-800">-</button>
				<span className="mx-3">{count}</span>
				<button onClick={increaseCount} className="bg-gray-300 px-2 py-1 rounded-sm text-gray-800">+</button>
			</span>
			{showError && <span className="text-red-400">Can't decrease below 0</span>}
			<button onClick={resetCount} className="mt-4">Reset</button>
		</>
	);
}
