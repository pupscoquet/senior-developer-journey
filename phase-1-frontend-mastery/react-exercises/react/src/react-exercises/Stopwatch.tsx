import { useRef, useState } from "react";

export default function StopwatchPage() {
	let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
	let [displayTime, setDisplayTime] = useState('00:00:00.00');
	let [started, setStarted] = useState(false);
	let timer = useRef<number>(0);

	function formatTime(time: number): string {
		return time < 10 ? "0" + time : time.toString();
	}

	function stopwatch() {
		milliseconds++;
		if (milliseconds === 100) {
			milliseconds = 0;
			seconds++;
			if (seconds === 60) {
				seconds = 0;
				minutes++;
				if (minutes === 60) {
					minutes = 0;
					hours++;
				}
			}
		}

		let h = formatTime(hours)
		let m = formatTime(minutes)
		let s = formatTime(seconds)
		let ms = formatTime(milliseconds)
		setDisplayTime(`${h}:${m}:${s}.${ms}`);
	}

	function watchStartStop() {
		if (started) {
			clearInterval(timer.current);
			setStarted(false);
		} else {
			timer.current = setInterval(stopwatch, 10);
			setStarted(true);
		}
	}

	return (
		<div className="w-full flex flex-col items-center gap-8">
			<div className="text-7xl font-bold text-white mt-20 font-mono">{displayTime}</div>
			<div className="flex items-center gap-4 *:bg-white *:py-2 *:px-5 *:rounded-md *:text-gray-600">
				<button onClick={watchStartStop}>{!started ? 'Start' : 'Stop'}</button>
				<button>{started ? 'Lap' : 'Reset'}</button>
			</div>
		</div>
	)
}
