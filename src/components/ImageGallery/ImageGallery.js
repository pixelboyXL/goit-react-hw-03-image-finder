import { ImageGalleryItem } from "./ImageGalleryItem";
import { Button } from "components/Button/Button";

export const ImageGallery = ({ image, allImages, ...otherProps }) => {
    return (
        <section>
            <ul className="ImageGallery">
                {allImages.map(image => (
                    <li className="gallery-item" key={image.id}>
                        <ImageGalleryItem image={image} />
                    </li>))}
            </ul>
            {allImages.length > 0 && <Button {...otherProps} />}
        </section>
    );
};