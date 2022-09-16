import axios from 'axios';

const fetchPhoto = async (searchTerm) => {
  const {
    data: { data },
  } = await axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API}&q=${searchTerm}`,
  );
  return data;
};

export default fetchPhoto;
