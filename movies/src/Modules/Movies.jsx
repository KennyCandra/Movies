import axios from "axios";

const headers = {
  accept: "application/json",
  "content-type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGRjMmYxNDM4Y2IzZTRlMWNiY2YwMTM3YjNkZDdmNyIsIm5iZiI6MTczMjY2ODg5Ni4zODkzNDYxLCJzdWIiOiI2NzE5NjkxM2ZlZmQxZTA1MTBmZmQ3YmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5MJklDntDf5ytap0bHJavqttf1f8JXfBOTJwRXDfvVc",
  "Content-Type": "application/json;charset=utf-8",
};

const sessionD = localStorage.getItem("session_id" || null);

export const addRatingAPI = async (id, value) => {
  const data = { value: value };
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/movie/${id}/rating?session_id=${sessionD}`,
      data,
      { headers: headers }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// DONE!!
export const fetchRating = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/account_states?session_id=${sessionD}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error.response || error.message);
  }
};

// DONE!!
export const removeRating = async (id) => {
  try {
    const response = await axios.delete(
      `https://api.themoviedb.org/3/movie/${id}/rating?session_id=${sessionD}`,
      { headers: headers }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addToFavoriteList = async (movieId, id) => {
  let url1 = `https://api.themoviedb.org/3/account/${id}/favorite?session_id=${sessionD}`;
  const data = {
    media_type: "movie",
    media_id: movieId,
    favorite: true,
  };
  try {
    const response = await axios.post(url1, data, { headers: headers });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addToWatchlist = async (movieId, user) => {
  const data = {
    media_type: "movie",
    media_id: movieId,
    watchlist: true,
  };
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?session_id=${sessionD}`,
      data,
      { headers: headers }
    );
    console.log(`added to watch list`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchReviews = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews`,
      { headers: headers }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromWatchList = async (movieId) => {
  let url1 =
    "https://api.themoviedb.org/3/account/2147483647/watchlist?session_id=bc5fbe1bb70203d72d6423bfbb4207be1da66066";
  const data = {
    media_type: "movie",
    media_id: movieId,
    watchlist: false,
  };

  try {
    const response = await axios.post(url1, data, { headers: headers });
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const getMyLists = async (user) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${user.id}/lists?session_id=${sessionD}`,
      { headers: headers }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchWatchList = async (user) => {
  if (sessionD === null) return;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist/movies?session_id=${sessionD}`,
      { headers: headers }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const MoviePage = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      { headers: headers }
    );
    return response.data.results;
  } catch (error) {
    console.error;
  }
};

export const fetchTypes = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,
      { headers: headers }
    );
    return response.data.genres;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataMovie = async (sortBy, WithGenres, num) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US?&page=`,
      {
        params: {
          sort_by: sortBy,
          with_genres: WithGenres,
          page: num,
        },
        headers: headers,
      }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const search = async (sort_by, with_genres, num) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          sort_by: sort_by,
          with_genres: with_genres,
          page: num,
        },
        headers: headers,
      }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchList = async (id) => {
  try {
    const data = await axios.get(`https://api.themoviedb.org/3/list/${id}`, {
      headers: headers,
    });
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const searching = async (value) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${value}`,
      {
        headers: headers,
      }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};
