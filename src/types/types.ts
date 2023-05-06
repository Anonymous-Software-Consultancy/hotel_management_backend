export type objectType = {
    [key: string]: string|object;
  }
export interface User {
    id: number
    created_at: Date
    updated_at: Date
    username: string
    first_name: string
    last_name: string
    email: string
    phone: string
    birth_date: string | null
    password: string
    is_superuser: boolean
}


export interface Hotel {
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    tax: number,
    service_charge: number,
    partnership_discount: number,
    discount_promo_code: string,
    discount_description: string,
    rating_value: number,
}

export interface FacilityGroup {
    id: number,
    created_at: Date,
    updated_at: Date,
    breakfast: boolean,
    restaurant: boolean,
    parking: boolean,
    two_four_security: boolean,
    business: boolean,
    swimming_pool: boolean,
    room_service: boolean,
    indoor_games: boolean,
    outdoor_activities: boolean,
    fitness_centre: boolean,
    airport_shuttle: boolean,
    early_checkin: boolean,
    late_checkout: boolean,
    kid_friendly: boolean,
    couple_friendly: boolean,
    disability_friendly: boolean,
    hotel_id: number,
}