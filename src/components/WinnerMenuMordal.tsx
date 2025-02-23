import { useEffect } from "react";
import { contact } from "../config";

interface WinnerMenuModalProps {
  imgSrc: string | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenWheelModal: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

function WinnerMenuModal({
  imgSrc,
  isOpen,
  setIsOpen,
  setIsOpenWheelModal,
  className,
}: WinnerMenuModalProps) {
  // const [isOpenWheelModal, setIsOpenWheelModal] = useState(false);

  useEffect(() => {
    setIsOpenWheelModal(false);
  }, [isOpen]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsOpenWheelModal(false);
  };
  return (
    <div>
      <dialog
        id="my_modal_3"
        // className={`modal modal-newspaper ${
        //   isOpen ? "modal-open" : "modal-close"
        // }`}
        className={`modal ${isOpen ? "modal-open" : "modal-close"}`}
      >
        <div
          className={`flex flex-col items-center p-4 relative + ${className}`}
        >
          <img
            src={imgSrc}
            alt="winner-menu"
            className="md:h-[700px] rounded-lg"
          />
          <button
            className="btn btn-xs btn-circle btn-ghost absolute text-white bg-rose-500 top-8 right-8 "
            onClick={() => handleCloseModal()}
          >
            ✕
          </button>
          <a
            href={`${contact[0].link}`}
            className="bg-rose-500 flex justify-center items-center  gap-2 w-[131px] h-[38px] rounded-lg mt-4 z-10"
          >
            <p className="font-semibold text-base text-white font-kanit">
              สั่งเลย !
            </p>
          </a>
        </div>
      </dialog>
    </div>
  );
}

export default WinnerMenuModal;
