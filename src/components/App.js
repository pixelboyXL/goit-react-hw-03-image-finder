import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from "./services/fetchImages";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { MagnifyingGlass } from 'react-loader-spinner';
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { ErrorImg } from "./ErrorImg/ErrorImg";
import img from 'components/images/Best-Coming-Soon-and-404-Error-Page-Templates-for-Your-Unique-Websites.jpg';

export class App extends Component {
  state = {
    text: '',
    page: 1,
    images: [],
    largeImageData: {},
    loading: false,
    isModalOpen: false,
    isError: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { text, page } = this.state;
    if (prevState.text !== text || prevState.page !== page) {
      this.setState({
        loading: true,
      });
      try {
        const result = await fetchImages(text, page);
        const { totalHits, hits } = result;
        const onlyNeedValues = hits.map(({ id, tags, webformatURL, largeImageURL }) => (
          {
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        if (totalHits === 0) {
          this.toastWarn();
          return this.setState({
            loading: false,
            isError: true,
          });
        };
        if (page === 1 && hits.length > 1) {
          this.toastSuccess();
        };
        this.setState(prevState => ({
          images: [...prevState.images, ...onlyNeedValues],
          loading: false,
          isError: false,
        }));
      } catch (error) {
        return this.toastError();
      };
    };
  };

  toastSettings = {
    theme: "colored",
  };

  searchImages = text => {
    if (this.state.text === text.trim()) {
      return this.toastInfoDuplication();
    };
    this.setState({
      text,
      page: 1,
      images: [],
    });
  };
  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  toggleModal = (event) => {
    const { code } = event;
    const { nodeName, dataset: { source }, alt } = event.target;
    const { isModalOpen } = this.state;
    if (nodeName === 'IMG') {
      if (isModalOpen === true) {
        return;
      };
      this.setState({
        isModalOpen: true,
        largeImageData: {
          source,
          alt,
        },
      });
    };
    if (nodeName === 'DIV' || code === "Escape") {
      this.setState({
        isModalOpen: false,
      });
    };
  };
  toastSuccess = () => {
    return toast.success("Hooray! We found what you were looking for 🤗", this.toastSettings);
  };
  toastInfoNothing = () => {
    return toast.info("It looks like you want to find nothing, please check your query 😕", this.toastSettings);
  };
  toastInfoDuplication = () => {
    return toast.info("It looks like there are already pictures found for your request, please check if this will be a new search 🤔", this.toastSettings); 
  };
  toastWarn = () => {
    return toast.warn("Sorry, nothing was found for your request, try something else 🙈", this.toastSettings); 
  };
  toastError = () => {
    return toast.error("Oops, something went wrong, please try again 🙊", this.toastSettings);
  };

  render() {
    const { images, largeImageData, loading, isModalOpen, isError } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchImages} toastInfo={this.toastInfoNothing} />
        {isError === true
          ? <ErrorImg errorImg={img} />
          : images.length > 0
          && < ImageGallery allImages={images} onToggleModal={this.toggleModal} />
        }
        {loading === true
          ? <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color='#3f51b5' />
          : images.length > 0
          && <Button text="Load more" type="button" loadMoreImages={this.loadMoreImages} />}
        {isModalOpen
          && <Modal data={largeImageData} onToggleModal={this.toggleModal} />}
        <ToastContainer autoClose={3000} />
      </>
    );
  };
};

/* <div
  style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#010101'
  }}
>
  React homework template
</div> */