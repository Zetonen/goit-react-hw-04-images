import axios from 'axios';
const KEY = '36802723-0938614ccb0b003a152802b8b';

export const fetchGallery = async (search, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${12}`
  );
  return response;
};
