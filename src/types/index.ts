export interface CoverPhoto {
  id: number | null
  original: string
  small: string
  big: string
  wide: string
  name: string
}

export interface Product {
  id: number
  title: string
  city_id: number
  cover_photo: CoverPhoto
  rating: number
  reviews_count: number
  price_min: number
  activity_type: string
  currency: string
  url: string
  description: string
  popularity: number
}

export interface City {
  id: number
  name: string
  country_name?: string
}
