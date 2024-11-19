import axios from "axios";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
  "Content-Type": "application/json;charset=utf-8",
};

const sessionD = localStorage.getItem("session_id");

export const addRatingAPI = async (id, value) => {
  const data = { value: value };
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/movie/${id}/rating`,
      data,
      { headers: headers }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const fetchRating = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/account_states`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error.response || error.message);
  }
};

export const removeRating = async (id) => {
  try {
    const response = await axios.delete(
      `https://api.themoviedb.org/3/movie/${id}/rating`,
      { headers: headers }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addToFavoriteList = async (movieId) => {
  let url1 = `https://api.themoviedb.org/3/account/2147483647/favorite?session_id=${sessionD}`;
  const data = {
    media_type: "movie",
    media_id: movieId,
    favorite: true,
  };
  try {
    const response = await axios.post(url1, data, { headers: headers });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addToWatchlist = async (movieId) => {
  const data = {
    media_type: "movie",
    media_id: movieId,
    watchlist: true,
  };
  try {
    const response = await axios.post(
      "https://api.themoviedb.org/3/account/null/watchlist",
      data,
      { headers: headers }
    );
    console.log(response);
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

export const getMyLists = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${sessionD}/lists`,
      { headers: headers }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchWatchList = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`,
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
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const search = async (sort_by, with_genres , num) => {
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
    return data.data
  } catch (error) {
    console.error(error);
  }
};