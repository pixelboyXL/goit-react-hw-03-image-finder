import PropTypes from 'prop-types';

export const Modal = ({ src, alt, closeModal }) => {
    return (
        <div className="Overlay" onClick={closeModal}>
            <div className="Modal">
                <img src={src} alt={alt}/>
            </div>
        </div>
    );
};

Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
};