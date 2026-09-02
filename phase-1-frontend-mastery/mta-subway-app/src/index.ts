const url = "https://subwayinfo.nyc/api/"

type arrivalInfo = {
	line: string;
	direction: string;
	minsAway: number;
}

function formatArrival(arrival: arrivalInfo) {
	const minsAway = arrival.minsAway;
	if (minsAway === 0) return `${arrival.line} | ${arrival.direction} | Due now\n`
	return `${arrival.line} | ${arrival.direction} | ${minsAway} mins\n`
}

let displayA = true;
async function displayArrivals() {
	const arrivals = await fetchStations();

	const line1 = formatArrival(arrivals[0])
	const line2 = formatArrival(arrivals[1])
	const line3 = formatArrival(arrivals[2])
	const line4 = formatArrival(arrivals[3])

	if (displayA) {
		console.log(line1, line2);
	} else {
		console.log(line3, line4);
	}
	displayA = !displayA;
}

function timedDisplay() {
	setTimeout(displayArrivals, 10000);
}

async function fetchStations(): Promise<arrivalInfo[]> {
	const classonAv = fetch(`${url}arrivals?station_id=G34&limit=2`);
	const clintonWashAv = fetch(`${url}arrivals?station_id=A44&limit=2`);
	const arrivals: arrivalInfo[] = [];
	await classonAv.then((response) => {
		return response.json()
		.then((r) => {
			r.arrivals.forEach((arr) => {
				arrivals.push({line: arr.line, direction: arr.headsign, minsAway: arr.minutesAway})
			})
		})
	});

	await clintonWashAv.then((response) => {
		return response.json()
		.then((r) => {
			r.arrivals.forEach((arr) => {
				arrivals.push({line: arr.line, direction: arr.headsign, minsAway: arr.minutesAway})
			})
		})
	});

	await arrivals.sort((arrivalA, arrivalB) => {
		const minsAwayA = arrivalA.minsAway;
		const minsAwayB = arrivalB.minsAway;

		return minsAwayA - minsAwayB;
	});

	return arrivals;
}

setInterval(timedDisplay, 5000);
