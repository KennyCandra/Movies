import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <nav className="h-12 flex w-[100%] content-center justify-center flex-wrap m-auto gap-4 bg-navBg">
      <img
        src="/images/imbd.png"
        className="w-16 h-8 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex flex-wrap content-center justify-center">
        <img
          src="/images/burger_menu-removebg-preview.png"
          className="size-8 invert"
        />
        <div className="content-evenly text-white">Menu</div>
      </div>
      <div className="flex flex-wrap content-center justify-center gap-4">
        <div className="text-white">All</div>
        <input
          className="h-5 p-3 rounded-md w-[720px] "
          placeholder="Search for your favourite Movie"
        />
      </div>
      <img src="/images/imbd.png" className="w-16 h-8" />
      <div className="flex gap-3 content-center justify-center flex-wrap">
        <p
          className="text-white cursor-pointer"
          onClick={() => navigate("/watchlist")}
        >
          Watch List
          <span className="inline-flex justify-center flex-wrap content-center size-5 mx-1 rounded-[50%] border">
            {" "}
            <span className="">1</span>
          </span>
        </p>
        <p className="text-white">
          {user.data ? `welcome ${user.data.username}` : `Sign In`}
        </p>
        <p className="text-white">En</p>
      </div>
    </nav>
  );
}

export default Header;
