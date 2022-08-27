import { Component } from "react";
import { Modal } from "components/Modal/Modal";

export class ImageGalleryItem extends Component {
    state = {
        isModalOpen: false,
        largeImageURL: '',
    };

    openModal = (event) => {
        const { nodeName, dataset} = event.target;
        if (nodeName !== 'IMG') {
            return;
        };
        const currentImg = dataset.source;
        this.setState({
            isModalOpen: true,
            largeImageURL: currentImg,
        });
        window.addEventListener("keydown", this.cancelKeyboard);
    };
    closeModal = (event) => {
        const { nodeName } = event.target;
        if (nodeName === 'DIV') {
            this.setState({
                isModalOpen: false,
            });
        };
    };
    cancelKeyboard = (evt) => {
        if (evt.code === "Escape") {
            this.setState({
                isModalOpen: false,
            });
            window.removeEventListener("keydown", this.cancelKeyboard);
        };
    };

    render() {
        const { image } = this.props;
        const { isModalOpen, largeImageURL } = this.state;
        return (
            <>
                <img src={image.webformatURL} data-source={image.largeImageURL} alt={image.tags} onClick={this.openModal} />
                {isModalOpen && <Modal src={largeImageURL} alt={image.tags} closeModal={this.closeModal} />}
            </>
        );
    };
};