export const Modal = ({src, alt, closeModal}) => {
    return (
        <div className="Overlay" onClick={closeModal}>
            <div className="Modal">
                <img src={src} alt={alt}/>
            </div>
        </div>
    );
};