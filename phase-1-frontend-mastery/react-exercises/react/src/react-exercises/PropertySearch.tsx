import React, { useState } from "react";

type Property = {
	id: number;
	address: string;
	city: string;
	price: number;
	bedrooms: number;
};

const properties: Property[] = [
	{
		id: 1,
		address: "10 Quincy St",
		city: "New York",
		price: 1300000,
		bedrooms: 2
	},
	{
		id: 2,
		address: "5 Mount Pleasant Crescent",
		city: "London",
		price: 500000,
		bedrooms: 2
	},
	{
		id: 3,
		address: "102 Welbourne",
		city: "Peterborough",
		price: 750000,
		bedrooms: 4
	},
	{
		id: 4,
		address: "955 Torres de Vera y Aragon",
		city: "Mar del Plata",
		price: 30000,
		bedrooms: 2
	},
	{
		id: 5,
		address: "10 Harcourt Rd",
		city: "London",
		price: 900000,
		bedrooms: 1
	},
	{
		id: 6,
		address: "42 Avinyo",
		city: "Barcelona",
		price: 600000,
		bedrooms: 2
	},
	{
		id: 7,
		address: "23 Wood Vale",
		city: "London",
		price: 4000000,
		bedrooms: 4
	},
	{
		id: 8,
		address: "1211 Bergen St",
		city: "New York",
		price: 4500000,
		bedrooms: 4
	}
]

function PropertyRow(
	{ property }:
		{ property: Property }
) {
	return (
		<div className="flex text-left items-center gap-4 mb-4">
			<div className="size-16 bg-gray-400 rounded-md"></div>
			<div>
				<div>{property.address}</div>
				<div>${property.price} · {property.bedrooms} bedrooms</div>
				<div>{property.city}</div>
			</div>
		</div>
	)
}

function Properties({ search, minBedrooms }: { search: string, minBedrooms: number }) {
	const filteredProperties: React.JSX.Element[] = [];

	properties.forEach((p) => {
		const matchesSearch =
			!search || p.address.toLowerCase().includes(search.toLowerCase())
			|| p.city.toLowerCase().includes(search.toLowerCase()) || p.price <= Number(search)

		const matchesMinBedrooms =
			!minBedrooms || p.bedrooms >= Number(minBedrooms);

		if (matchesSearch && matchesMinBedrooms) {
			filteredProperties.push(<PropertyRow property={p} key={p.id} />);
		}
	})

	return (
		<>
			{filteredProperties}
		</>
	)
}

export default function PropertyPage() {
	let [search, setSearch] = useState('');
	let [minBedrooms, setMinBedrooms] = useState('');

	function handleSetSearch(value: string) {
		setSearch(search = value);
	}

	function handleSetMinBedrooms(value: string) {
		setMinBedrooms(minBedrooms = value)
	}

	const bedroomRadioButtons = [
		{ id: 1, value: "min-1-bedroom" },
		{ id: 2, value: "min-2-bedroom" },
		{ id: 3, value: "min-3-bedroom" },
		{ id: 4, value: "min-4-bedroom" }
	]

	return (
		<>
			<div className="p-4">
				<form className="flex mb-4 gap-4">
					<label htmlFor="search" className="sr-only">Search</label>
					<input
						type="text"
						id="search"
						placeholder="Search..."
						value={search}
						onChange={(e) => handleSetSearch(e.target.value)}
						className="pl-2 flex flex-1 bg-white rounded-sm"
					/>
					<div className="text-right">Min. <br /> bedrooms</div>
					<fieldset className="flex gap-6 justify-between">
						{bedroomRadioButtons.map((button) => (
							<label htmlFor={button.value}>{button.id}
								<input
									type="radio"
									id={button.value}
									name="minBedrooms"
									value={button.id.toString()}
									checked={minBedrooms === button.id.toString()}
									onChange={(e) => handleSetMinBedrooms(e.target.value)}
									className="pl-2 flex flex-1 bg-white rounded-sm"
								/>
							</label>

						))}
					</fieldset>
				</form>
				<Properties search={search} minBedrooms={Number(minBedrooms)} />
			</div>
		</>
	)
}
