import { promotionImages } from "../config";

interface PromotionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PromotionModal({ isOpen, setIsOpen }: PromotionModalProps) {
  return (
    <>
      <dialog
        id="my_modal_3"
        className={`modal ${isOpen ? "modal-open" : "modal-close"}`}
      >
        <div className="relative">
          <form method="dialog">
            <button
              className="btn btn-xs btn-circle btn-ghost text-white bg-primary absolute top-2 right-2"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <div className="max-w-[340px] carousel rounded-0">
              {promotionImages.map((item, index) => (
                <div key={index} className="carousel-item w-full">
                  <img src={item} alt={"promotion image"} />
                </div>
              ))}
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default PromotionModal;
