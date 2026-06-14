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
  activity_type: string
  cover_photo: CoverPhoto
  customers_review_rating: number
  reviews: number
  price: string
}

export interface City {
  id: number
  name: string
  country_name?: string
}