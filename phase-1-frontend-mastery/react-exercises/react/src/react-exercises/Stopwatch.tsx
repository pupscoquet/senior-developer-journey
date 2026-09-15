import { useRef, useState } from "react";

let laps: [number, string][] = [];
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];

function formatTime(time: number): string {
	return time < 10 ? "0" + time : time.toString();
}

function Lap({ lap }: { lap: [number, string] }) {
	return (
		<div className="text-white w-full flex justify-between text-sm border-b">
			<div>Lap #{lap[0]}</div>
			<div>{lap[1]}</div>
		</div>
	)
}

export default function StopwatchPage() {
	let [displayTime, setDisplayTime] = useState('00:00:00.00');
	let [started, setStarted] = useState(false);
	let [lapNo, setLapNo] = useState(0);
	let timer = useRef<number>(0);

	function stopwatch() {
		milliseconds++;
		if (milliseconds === 100) {
			milliseconds = 0;
			seconds++
			if (seconds === 60) {
				seconds = 0
				minutes++;
				if (minutes === 60) {
					minutes = 0
					hours++
				}
			}
		}

		let h = formatTime(hours)
		let m = formatTime(minutes)
		let s = formatTime(seconds)
		let ms = formatTime(milliseconds)
		setDisplayTime(`${h}:${m}:${s}.${ms}`);
	}

	function startOrStop() {
		if (started) {
			clearInterval(timer.current);
			setStarted(false);
		} else {
			timer.current = setInterval(stopwatch, 10);
			setStarted(true);
		}
	}

	function resetOrLap() {
		if (started) {
			setLapNo(lapNo = lapNo + 1);
			laps.push([lapNo, displayTime])
		} else {
			clearInterval(timer.current);
			[milliseconds, seconds, minutes, hours] = [0, 0, 0, 0]
			setDisplayTime('00:00:00.00')
			setLapNo(0);
			laps = []
		}
	}

	return (
		<div className="flex flex-col items-center gap-8 w-fit mx-auto">
			<div className="text-7xl font-bold text-white mt-20 font-mono">{displayTime}</div>
			<div className="flex items-center gap-4 *:py-2 *:px-5 *:rounded-md *:text-white *:w-30">
				<button onClick={startOrStop} className={!started ? "bg-green-400" : "bg-red-400"}>{!started ? 'Start' : 'Stop'}</button>
				<button onClick={resetOrLap} className={"bg-gray-400"}>{started ? 'Lap' : 'Reset'}</button>
			</div>
			<div className="w-full *:py-2">
				{laps.map((lap) =>
					<Lap lap={lap} key={lap[0]} />
				)}
			</div>
		</div>
	)
}
