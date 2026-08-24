const url = "https://subwayinfo.nyc/api/"

const response = fetch(`${url}arrivals?station_id=127&limit=5`);

response.then((r) => {})
