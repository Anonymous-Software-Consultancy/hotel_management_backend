export type objectType = {
  [key: string]: string | object;
};
export interface User {
  id: number;
  created_at: Date;
  updated_at: Date;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string | null;
  password: string;
  is_superuser: boolean;
}

export interface Hotel {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  tax: number;
  service_charge: number;
  partnership_discount: number;
  discount_promo_code: string;
  discount_description: string;
  rating_value: number;
}

export interface FacilityGroup {
  affectedRows: number;
  length: number;
  id: number;
  created_at: Date;
  updated_at: Date;
  breakfast: boolean;
  restaurant: boolean;
  parking: boolean;
  two_four_security: boolean;
  business: boolean;
  swimming_pool: boolean;
  room_service: boolean;
  indoor_games: boolean;
  outdoor_activities: boolean;
  fitness_centre: boolean;
  airport_shuttle: boolean;
  early_checkin: boolean;
  late_checkout: boolean;
  kid_friendly: boolean;
  couple_friendly: boolean;
  disability_friendly: boolean;
  hotel_id: number;
}

export interface BoardType {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  code: string;
  description: string;
}

export interface Packages {
  id: number,
  created_at: Date,
  updated_at: Date,
  package_class: string;
  description: string;
  for_days: number;
  is_tax_included: boolean;
  location: string;
  place: string;
  price_for_child_3_t_6: number;
  price_for_child_7_t_12: number;
  price_for_double: number;
  price_for_infant: number;
  price_for_single: number;
  price_for_triple: number;
  valid_from: Date;
  valid_to: Date;
  affectedRows: number;
}

export interface Rooms {
    id: number,
    created_at: Date,
    updated_at: Date,
    adult: number,
    child: number,
    extra_bed: number,
    max_occupancies: number,
    available_room: number,
    rate: number,
    is_booked: boolean,
    board_type_id: number,
    hotel_id: number,
    affectedRows: number;
}

export interface RoomImages {
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description: string,
    source_url: string,
    room_id: number,
    affectedRows: number
}
export interface HotelImages {
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description: string,
    source_url: string,
    hotel_id: number,
    affectedRows: number
}
export interface Carts {
    id: number,
    created_at: Date,
    updated_at: Date,
    user_id: number,
    room_id: number,
    hotel_id: number,
    affectedRows: number
}

export interface FeedBacks {
  id: number,
  created_at: Date,
  updated_at: Date,
  rating_value: number,
  review_comment: string,
  user_id: number,
  hotel_id: number,
  affectedRows: number
}

export interface Addresses {
  id: number,
  created_at: Date,
  updated_at: Date,
  area: string,
  street_address: string,
  city: string,
  country: string,
  hotel_id: number,
  affectedRows: number
}

export interface Amenities {
  id: number,
  created_at: Date,
  updated_at: Date,
  air_conditioning: boolean,
  balcony: boolean,
  bathtub: boolean,
  ceiling_fan: boolean,
  clothes_dryer: boolean,
  connecting_rooms: boolean,
  cooker: boolean,
  dining_area: boolean,
  electric_kettle: boolean,
  garden_view: boolean,
  hairdryer: boolean,
  hot_water: boolean,
  ironing_set: boolean,
  kitchenete: boolean,
  microwave_oven: boolean,
  minibar: boolean,
  mountain_or_hill_view: boolean,
  non_smoking_room: boolean,
  pool_view: boolean,
  power_outlet: boolean,
  private_beach: boolean,
  safe_or_locker: boolean,
  smoking_room: boolean,
  tea_and_offee: boolean,
  telephone: boolean,
  toiletries: boolean,
  tv: boolean,
  wifi: boolean,
  room_id: number,
  affectedRows: number
}