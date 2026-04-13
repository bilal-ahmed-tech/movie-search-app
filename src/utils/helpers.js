import { IMAGE_BASE_URL } from "../constants/index"
import { IMAGE_SIZES } from "../constants/index"
export function getPosterUrl(path, size = "w500") {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${IMAGE_SIZES[size] || IMAGE_SIZES.medium}${path}`
}

export function getYear(dateString) {
  if (!dateString) return "Unknown"
  return dateString.split("-")[0]
}