import WheelComponent from "./Wheel";
import { recommendMenuItems, segment } from "../config";
import confetti from "canvas-confetti";
import { useState } from "react";
import {wheelOptionColors} from "../config"

interface PromotionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImgSrc?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsOpenWinnerMenuModal?: React.Dispatch<React.SetStateAction<boolean>>;
  disableClose?: boolean;
}

function WheelModal({
  isOpen,
  setIsOpen,
  setImgSrc,
  setIsOpenWinnerMenuModal,
}: PromotionModalProps) {

  const [disabledClose, setDisabledClose] = useState(false);

  // const segments = [...recommendMenuItems.map((item) => item.segment)];
  const segments: string[] = segment;

  const segColors = wheelOptionColors.segColors;

  const onFinished = () => {
    // const winnerMenu = recommendMenuItems.find(
    //   (item) => item.segment === winner
    // );
    // const winnerMenuImage = winnerMenu?.imgSrc;
    const randomIndex = Math.floor(Math.random() * recommendMenuItems.length);
    const randomMenu = recommendMenuItems[randomIndex];
    const winnerMenuImage = randomMenu.imgSrc;
    if (setImgSrc) {
      setImgSrc(winnerMenuImage);
    }
    if (setIsOpenWinnerMenuModal) {
      setIsOpenWinnerMenuModal(true);
      celebrateEffect();
    }
    setDisabledClose(false);
  };

  const celebrateEffect = () => {
    confetti({
      particleCount: 300,
      spread: 90,
      origin: { x: 1, y: 0.9 },
    });

    confetti({
      particleCount: 300,
      spread: 90,
      origin: { x: 0, y: 0.9 },
    });
  };

  // const upDuration = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
  // const downDuration = Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
  const upDuration = Math.floor(Math.random() * (240 - 100 + 1)) + 100;
  const downDuration = Math.floor(Math.random() * (400 - 300 + 1)) + 300;

  return (
    <>
      <dialog
        id="my_modal_3"
        className={`overflow-hidden modal ${
          isOpen ? "modal-open" : "modal-close"
        }`}
      >
        <div className="relative w-full flex flex-col justify-center items-center scale-90 gap-4">
          {/* <button
            disabled={disabledClose}
            className="btn btn-xs btn-ghost text-white bg-rose-500 w-16 h-10 text-base ml-auto"
            onClick={() => setIsOpen(false)}
          >
            ปิด
          </button> */}
          <button
            disabled={disabledClose}
            className="btn btn-xs btn-circle btn-ghost text-white bg-rose-500 w-8 h-8 ml-auto mr-4"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          <div className="wheel">
            <WheelComponent
              segments={segments}
              segColors={segColors}
              winningSegment=""
              onFinished={() => onFinished()}
              primaryColor=""
              contrastColor="#fff"
              buttonText="สุ่มเมนู"
              isOnlyOnce={false}
              size={170}
              upDuration={upDuration}
              downDuration={downDuration}
              fontFamily="Sriracha"
              setDisableClose={setDisabledClose}
            />
          </div>
          <form method="dialog"></form>
        </div>
      </dialog>
      {/* {isOpenWinnerMenuModal && (
        <WinnerMenuModal
          imgSrc={imgSrc}
          isOpen={isOpenWinnerMenuModal}
          setIsOpen={setIsOpenWinnerMenuModal}
          setIsOpenWheelModal={setIsOpen}
          setWheelOpacity={setOpacity}
        />
      )} */}
    </>
  );
}

export default WheelModal;
