const KEY = '42508369-6cc99fb978405cb8598a23b23';
const BASE_URL = 'https://pixabay.com/api/';

const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = true;
// const PER_PAGE = 15;

import axios from 'axios';

export async function getImages(searchText) {
  try {
    const QUERY = encodeURIComponent(searchText);
    const requestURL = `${BASE_URL}?key=${KEY}&q=${QUERY}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}`;

    const response = await axios.get(requestURL);
    if (response.status !== 200) {
      throw new Error('Image error');
    }
    return response.data;
  } catch (error) {
    throw new Error('Error while fetching images from pixabay', error);
  }
}
