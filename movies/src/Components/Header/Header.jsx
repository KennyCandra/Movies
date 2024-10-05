function Header() {
  return (
    <div className="contanier w-[100%] px-[12px] h-[48px] flex content-center justify-center">
      <div className="content flex gap-[20px] w-[100%] max-w-5xl m-auto justify-center">
        <img src="/images/placeHolderImage.jpg" className="w-[64px] h-[32px]" />
        <div className="flex items-center">
            <img src="/images/burger menu.png" className="w-[24px] h-[24px]" />
            <div className="">Menu</div>
        </div>
        <div className="flex gap-3">
            <button>all</button>
            <input className="border-black border" />
        </div>
        <div>
            <img src="/images/placeHolderImage.jpg" className="w-1 h-1" />
        </div>
        <div className="flex gap-4">
            <button>watch list</button>
            <button>sign in</button>
            <button>En</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
