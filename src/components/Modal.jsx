import ReactModal from "react-modal";

const Modal = ({
  isOpen,
  onClose,
  size,
  title,
  children,
  titleCustomClass,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50"
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      contentLabel="Example Modal"
      shouldCloseOnEsc={true}
      ariaHideApp={false}
    >
      <div
        className={`bg-[#E7F3FC]  rounded-lg shadow-lg ${
          size ? `max-w-${size}` : `max-w-lg`
        } px-5  overflow-y-auto max-h-[80vh]`}
      >
        <div className="flex items-center justify-between mb-3 border-b py-4 px-3 ">
          {title ? <h2 className="text-xl">{title}</h2> : ""}
          {onClose ? <button onClick={onClose}>X</button> : ""}
        </div>
        <div>{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
