import { Component } from "react";
import { fetchImages } from "../src/Services/api";
import Button from "./Components/Button/Button";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";
import Spinner from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import Searchbar from "./Components/Searchbar/Searchbar";
import "./App.css";

class App extends Component {
  state = {
    images: [],
    searchQuery: "",
    largeImage: "",
    alt: "",
    currentPage: 1,
    isLoading: false,
    showModal: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.onFetchImages();
    }
  }

  onSearchImages = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };
  onFetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then((images) => {
        console.log(images);
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };
  openImg = (images) => {
    this.setState({ largeImage: images.largeImageURL, alt: images.tags });
    console.log(this.state.largeImage);

    this.toggleModal();
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { images, isLoading, largeImage, alt, showModal, error } = this.state;

    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchImages} />
        <ImageGallery>
          <ImageGalleryItem images={images} onClick={this.openImg} />
        </ImageGallery>
        {isLoading && <Spinner />}
        {shouldRenderLoadMoreButton && <Button onClick={this.onFetchImages} />}

        {showModal && (
          <Modal onClose={this.toggleModal} src={largeImage} alt={alt}></Modal>
        )}
        {error && <p className="Error">{error}</p>}
      </div>
    );
  }
}

export default App;
