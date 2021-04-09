import PropTypes from "prop-types";
import style from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ webformatURL, tags, largeImageURL }, id) => (
    <li className={style.ImageGalleryItem} key={id}>
      <img
        className={style.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={() => onClick({ largeImageURL })}
      />
    </li>
  ));
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
