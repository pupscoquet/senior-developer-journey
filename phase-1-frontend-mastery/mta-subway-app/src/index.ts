const url = "https://subwayinfo.nyc/api/arrivals?station_id="

type arrivalInfo = {
	line: string;
	direction: string;
	minsAway: number;
}

function formatArrival(arrival: arrivalInfo) {
	const minsAway = arrival.minsAway;
	const direction = arrival.direction === "Court Sq"
		? "Queens"
		: arrival.direction === "Church Av"
		? "Kensington"
		: arrival.direction === "168 St"
		? "Jamaica"
		: "Manhattan";
	if (minsAway === 0) return `${arrival.line} | ${direction} | Due now\n`
	else if (minsAway === 1) return `${arrival.line} | ${direction} | ${minsAway}min\n`
	return `${arrival.line} | ${direction} | ${minsAway}mins\n`
}

let displayA = true;
async function displayArrivals() {
	const arrivals = await fetchStations("G34", "A44", 2);

	const line1 = formatArrival(arrivals[0])
	const line2 = formatArrival(arrivals[1])
	const line3 = formatArrival(arrivals[2])
	const line4 = formatArrival(arrivals[3])

	if (displayA) {
		console.log(line1, line2);
	} else {
		console.log(line3, line4);
		console.log("--------------------\n")
	}
	displayA = !displayA;
}

function timedDisplay() {
	setTimeout(displayArrivals, 10000);
}

async function fetchStations(station1Id: string, station2Id: string, limit: number): Promise<arrivalInfo[]> {
	const station1 = fetch(`${url}${station1Id}&limit=${limit}`);
	const station2 = fetch(`${url}${station2Id}&limit=${limit}`);

	const arrivals: arrivalInfo[] = [];
	await station1.then((response) => {
		return response.json()
		.then((r) => {
			r.arrivals.forEach((arr) => {
				arrivals.push({line: arr.line, direction: arr.headsign, minsAway: arr.minutesAway})
			})
		})
	});

	await station2.then((response) => {
		return response.json()
		.then((r) => {
			r.arrivals.forEach((arr) => {
				arrivals.push({line: arr.line, direction: arr.headsign, minsAway: arr.minutesAway})
			})
		})
	});

	arrivals.sort((arrivalA, arrivalB) => {
		const minsAwayA = arrivalA.minsAway;
		const minsAwayB = arrivalB.minsAway;

		return minsAwayA - minsAwayB;
	});

	return arrivals;
}

setInterval(timedDisplay, 5000);
