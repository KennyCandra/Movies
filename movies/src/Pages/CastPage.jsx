import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCredits, MoviePage } from "../Modules/Movies";
import Loader from "../Components/Loader";
import Header from "../Components/Header/Header";
import Cast from "../Components/Cast";
import Footer from "../Components/Footer";

function CastPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieAndCredits = async () => {
      setLoading(true);
      try {
        const movieRes = await MoviePage(id);
        const response = await fetchCredits(id);
        setMovie(movieRes);
        setCredits(response);
      } catch (error) {
        console.error("error fetchCredits", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndCredits();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Header />
      <Cast movie={movie} credits={credits} />
      <Footer />
    </>
  );
}

export default CastPage;
