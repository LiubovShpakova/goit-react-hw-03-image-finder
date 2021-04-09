import axios from "axios";
const key = "20348954-7114cf64e9bcf2486dba09445";
const BASE_URL = "https://pixabay.com/api";

export function fetchImages(searchQuery, currentPage) {
  return axios
    .get(
      `${BASE_URL}/?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
}
