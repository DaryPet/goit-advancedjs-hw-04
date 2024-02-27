const KEY = '42508369-6cc99fb978405cb8598a23b23';
const BASE_URL = 'https://pixabay.com/api/';

const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = true;

export function getImages(searchText) {
  const QUERY = encodeURIComponent(searchText);
  const requestURL = `${BASE_URL}?key=${KEY}&q=${QUERY}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}`;

  return fetch(requestURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Image error');
      }
      return response.json();
    })
    .catch(error => {
      throw new Error('Error while fetching images from pixabay', error);
    });
}
