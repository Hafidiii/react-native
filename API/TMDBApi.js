// API/TMDBApi.js

import axios from "axios";

const API_TOKEN = "b38e7e3875489e18bb8b0c94c742b9fc";

export const getFilmsFromApiWithSearchedText = text => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
    axios.get(url)
        .then(res => {
            return res.data.results
        });
};

export const getImageFromApi = name => {
    return 'https://image.tmdb.org/t/p/w300' + name
}