import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem";
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from "components/Button/Button";

export const ImageGallery = ({ allImages, loading, ...otherProps }) => {
    return (
        <section>
            <ul className="ImageGallery">
                {allImages.map(image => (
                    <li className="ImageGalleryItem" key={image.id}>
                        <ImageGalleryItem image={image} />
                    </li>))}
            </ul>
            {loading === true
                ? <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor = '#c0efff'
                    color='#3f51b5'
                />
                : allImages.length > 0 && <Button {...otherProps} />}
        </section>
    );
};

ImageGallery.propTypes = {
    allImages: PropTypes.array.isRequired,
};