import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='modal-backdrop'>
            <div className='modal'>
                <button className='close-btn' onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
