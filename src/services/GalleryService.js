import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '34696430-6b2d422f51ccceb24da3a2678';

const searchParams = new URLSearchParams({
  key: API_KEY,
  // q: '',
  image_type: 'photo',
  orientation: 'horisontal',
  safesearch: 'false',
  per_page: 12,
});
export default class GalleryService {
  constructor(name) {
    this.name = '';
    this.page = 1;
  }

  async getImages(name) {

    const url = `${BASE_URL}q=${this.name}&page=${this.page}&${searchParams}`;

    const response = await axios.get(url);

    return response.data;
  }
}
