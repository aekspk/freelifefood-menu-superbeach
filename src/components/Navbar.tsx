import { useState } from "react";
import WheelModal from "./WheelModal";
import WinnerMenuModal from "./WinnerMenuMordal.tsx";
import HeaderImage from "../assets/HeaderImage.png";
import {wheelOptionColors} from "../config"


function Navbar() {
  const [isOpenWheelModal, setIsOpenWheelModal] = useState(false);
  const [isOpenWinnerMenuModal, setIsOpenWinnerMenuModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  return (
    <>
      <nav className="w-full h-fit flex justify-center items-center relative">
        <img src={HeaderImage} alt="Header" className="w-full h-full" />
        <div className="fixed top-32 right-2 flex flex-col gap-2">
          <img
            className="w-[64px]"
            src={wheelOptionColors.imgSrc}
            onClick={() => setIsOpenWheelModal(true)}
          ></img>
        </div>
      </nav>
      {isOpenWheelModal && (
        <WheelModal
          isOpen={isOpenWheelModal}
          setIsOpen={setIsOpenWheelModal}
          setImgSrc={setImgSrc}
          setIsOpenWinnerMenuModal={setIsOpenWinnerMenuModal}
        />
      )}
      <WinnerMenuModal
        imgSrc={imgSrc}
        isOpen={isOpenWinnerMenuModal}
        setIsOpen={setIsOpenWinnerMenuModal}
        setIsOpenWheelModal={setIsOpenWheelModal}
        className="newspaper"
      />
    </>
  );
}

export default Navbar;
