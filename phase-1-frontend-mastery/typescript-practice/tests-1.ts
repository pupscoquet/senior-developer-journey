// TEST 1

type Property = {
  id: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  propertyType: "house" | "apartment" | "condo";
  status: "active" | "pending" | "sold";
};

function searchProperties(
  properties: Property[],
  filters: {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    propertyType?: Property["propertyType"];
  }
): Property[] {
	const results: Property[] = properties;

	properties.forEach((p) => {
		if (filters.city && p.city !== filters.city) {
			results.splice(results.indexOf(p), 1);
		}
		else if (filters.minPrice && filters.maxPrice && filters.minPrice > filters.maxPrice) {
			// TODO(vc): replace below with UI error
			console.error("Max price can't be lower than min price");
		}
		else if (filters.minPrice && p.price < filters.minPrice) {
			results.splice(results.indexOf(p), 1);
		}
		else if (filters.maxPrice && p.price > filters.maxPrice) {
			results.splice(results.indexOf(p), 1);
		}
		else if (filters.minBedrooms && p.bedrooms < filters.minBedrooms) {
			results.splice(results.indexOf(p), 1);
		}
		else if (filters.propertyType && p.propertyType !== filters.propertyType) {
			results.splice(results.indexOf(p), 1);
		}
	});

	results.sort((propertyA, propertyB) => {
		const priceA = propertyA.price;
		const priceB = propertyB.price;

		return priceA - priceB;
	});

	return results;
}

//  TEST 2
