import axios from 'axios';

const API_KEY = '34785269-2da0cadfc3fd212a10b88586f';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&per_page=12`;

export default function fetchImages(searchQuery, page){
  try {
    const response = axios.get(`${BASE_URL}&q=${searchQuery}&page=${page}`);
    return response;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
