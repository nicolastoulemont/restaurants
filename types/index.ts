export interface RestaurantInfos {
	objectID: string
	name: string
	food_type: string
	dining_style: string
	address: string
	neighborhood: string
	area: string
	city: string
	postal_code: string
	country: string
	price: number
	price_range: string
	stars_count: number
	rounded_stars_count: number
	image_url: string
	mobile_reserve_url: string
	payment_options: Array<string>
	phone: string
	reserve_url: string
	state: string
	_geoloc: {
		lat: string
		lng: string
	}
	reviews_count: number
	phone_number: string
}
