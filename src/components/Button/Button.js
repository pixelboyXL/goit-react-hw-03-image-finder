import PropTypes from 'prop-types';

export const Button = ({ loadMoreImages }) => {
    return (
        <button type="button" className="Button" onClick={loadMoreImages}>Load more</button>
    );
};

Button.propTypes = {
    loadMoreImages: PropTypes.func.isRequired,
};