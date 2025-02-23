import { useState } from "react";
import WheelModal from "./WheelModal";
import wheel from "../assets/wheel.png";
import WinnerMenuModal from "./WinnerMenuMordal.tsx";
import HeaderImage from "../assets/HeaderImage.png";

function Navbar() {
  const [isOpenWheelModal, setIsOpenWheelModal] = useState(false);
  const [isOpenWinnerMenuModal, setIsOpenWinnerMenuModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  return (
    <>
      <nav className="w-full h-fit flex justify-center items-center relative">
        <img src={HeaderImage} alt="Header" className="w-full h-full" />
        {/* <img src={`${logo}`} alt={"logo"} className="h-[90px] opacity-0"></img> */}
        <div className="fixed top-32 right-2 flex flex-col gap-2">
          {/* <button
            className="rounded-full bg-primary w-[28px] h-[28px] flex justify-center items-center"
            onClick={() => setIsOpenPromotionModal(true)}
          >
            <img
              className="h-[14px] "
              src={"/src/assets/megaphone.svg"}
              alt={"megaphone icon"}
            ></img>
          </button> */}
          <img
            className="w-[64px]"
            src={wheel}
            onClick={() => setIsOpenWheelModal(true)}
          ></img>
        </div>
      </nav>
      {/* <PromotionModal
        isOpen={isOpenPromotionModal}
        setIsOpen={setIsOpenPromotionModal}
      /> */}
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
