import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchImages } from "../Modules/Movies";
import MovieImages from "../Components/MovieImages";

function ImagesPage() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchImages(id);
      setImages(response.data.posters);
    };
    fetchData();
  }, []);
  return (
    <div>
      <MovieImages images={images} id={id} />
    </div>
  );
}

export default ImagesPage;
