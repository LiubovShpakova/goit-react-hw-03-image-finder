import { Component } from "react";
import { fetchImages } from "../src/Services/api";
import Button from "./Components/Button/Button";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";
import Spinner from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import Searchbar from "./Components/Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  onSearchImages = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      alt: [],
      error: null,
    });
  };

  onFetchImages = () => {
    this.setState({ isLoading: true });

    fetchImages(this.state.searchQuery, this.state.currentPage)
      .then((images) => {
        console.log(images);
        if (images.length === 0) {
          return this.setState({
            error: toast("Something went wrong", {
              className: "error_toast",
            }),
          });
        }
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
          error: null,
        }));
      })
      .catch((error) =>
        this.setState({
          error: toast("Something went wrong", {
            className: "error_toast",
          }),
        })
      )
      .finally(() => this.setState({ isLoading: false }));
  };
  openImg = (images) => {
    this.setState({ largeImage: images.largeImageURL });
    this.setState({ alt: images.tags });

    this.toggleModal();
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { images, isLoading, largeImage, alt, showModal } = this.state;

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
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
