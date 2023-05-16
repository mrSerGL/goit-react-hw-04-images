import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '34696430-6b2d422f51ccceb24da3a2678';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'false',
  per_page: 12,
});

const FetchImages = async  (searchQuery, page) => {

    const url = `${BASE_URL}q=${searchQuery}&page=${page}&${searchParams}`;

    const response = await axios.get(url);

    return response.data;

}

export default FetchImages;
