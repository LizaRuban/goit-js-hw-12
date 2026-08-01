const API_KEY = '56827809-548e8e575633a6bef97a51a72';
const BASE_URL = 'https://pixabay.com/api/';
import axios from 'axios';

export default async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return response.data;
}
