import axios from "axios";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
  "Content-Type": "application/json;charset=utf-8",
};

export const addRatingAPI = async (id) => {
  const data = { value: 6 };
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/tv/${id}/rating`,
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
      `https://api.themoviedb.org/3/tv/${id}/account_states`,
      { headers }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.response || error.message);
  }
};

export const removeRating = async (id) => {
  try {
    const response = await axios.delete(
      `https://api.themoviedb.org/3/tv/${id}/rating`,
      { headers: headers }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const fetchReviews = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews`,{ headers: headers });
      console.log(response);
  } catch (error) {
    console.error(error);
  }
};
