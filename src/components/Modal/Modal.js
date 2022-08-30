import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
    componentDidMount() {
        const { onToggleModal } = this.props;
        window.addEventListener("keydown", onToggleModal);
    };
    componentWillUnmount() {
        const { onToggleModal } = this.props;
        window.removeEventListener("keydown", onToggleModal);
    };

    render() {
    const { data: { source, alt }, onToggleModal } = this.props;
        return (
            <div className="Overlay" onClick={onToggleModal}>
                <div className="Modal">
                    <img src={source} alt={alt} />
                </div>
            </div>
        );
    };
};

Modal.propTypes = {
    data: PropTypes.shape({
        source: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }).isRequired,
    onToggleModal: PropTypes.func.isRequired,
};