import React from "react";

const Modal = ({ score, resetGame }) => {
  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations the game is over</h3>
          <p className="py-4">You scored {score} out of 10.</p>
          <p>Try again</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn" onClick={() => resetGame()}>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
