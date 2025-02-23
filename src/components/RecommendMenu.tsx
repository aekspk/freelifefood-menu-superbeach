import { recommendMenuItems } from "../config";
import { useEffect, useRef, useState } from "react";
import RecommendMenuModal from "./RecommendMenuModal";

function RecommendedMenu() {
  const [isOpenWinnerMenuModal, setIsOpenWinnerMenuModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const handleOnClick = (imgSrc: string) => {
    setImgSrc(imgSrc);
    setIsOpenWinnerMenuModal(true);
  };
  const carouselRef = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      const screenWidth = window.innerWidth;
      const carouselItemWidth = 200;
      const paddingLeft = (screenWidth - carouselItemWidth) / 2;
      carouselRef.current.style.paddingLeft = `${paddingLeft}px`;
      setPaddingLeft(paddingLeft);
    }
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center h-fit">
        <div className="text-black text-2xl font-bold font-sriracha mb-2">
          เมนูแนะนำ
        </div>
        <div
          ref={carouselRef}
          className="w-full h-fit carousel carousel-center bg-transparent py-4 pr-4 gap-4 flex"
          style={{
            paddingLeft: `${paddingLeft}px`,
            paddingRight: `${paddingLeft}px`,
          }}
        >
          {recommendMenuItems.map((item, index) => (
            <div
              key={index}
              className="carousel-item w-[210px] flex flex-col items-center gap-4"
              onClick={() => handleOnClick(item.imgSrc)}
            >
              <div className="rounded-sm shadow-md">
                <img
                  src={item.imgSrc}
                  className=" w-full object-fit rounded-lg"
                />
              </div>
              {/* <p className="text-black text-base font-normal">{item.text.TH}</p> */}
            </div>
          ))}
        </div>
      </div>
      <RecommendMenuModal
        imgSrc={imgSrc}
        isOpen={isOpenWinnerMenuModal}
        setIsOpen={setIsOpenWinnerMenuModal}
        setIsOpenWheelModal={() => {}}
      />
    </>
  );
}

export default RecommendedMenu;
