interface WinnerMenuModalProps {
  imgSrc: string | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenWheelModal: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

function RecommendMenuModal({
  imgSrc,
  isOpen,
  setIsOpen,
  setIsOpenWheelModal,
  className,
}: WinnerMenuModalProps) {
  // const [isOpenWheelModal, setIsOpenWheelModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsOpenWheelModal(false);
  };
  return (
    <div>
      <dialog
        id="my_modal_3"
        className={`modal modal-newspaper ${
          isOpen ? "modal-open" : "modal-close"
        }`}
      >
        <div
          className={`flex flex-col items-center p-4 relative + ${className}`}
        >
          <img src={imgSrc} alt="winner-menu" className="md:h-[700px]" />
          <button
            className="btn btn-xs btn-circle btn-ghost absolute text-white bg-rose-500 top-8 right-8"
            onClick={() => handleCloseModal()}
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default RecommendMenuModal;
