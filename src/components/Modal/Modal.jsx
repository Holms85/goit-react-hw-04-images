import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  
    return ReactDOM.createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>{children} </ModalWindow>
      </Overlay>,document.querySelector("#modal-root")
      
    );
  
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};