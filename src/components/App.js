import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from "./services/fetchImages";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ErrorImg } from "./ErrorImg/ErrorImg";

const toastSettings = {
  theme: "colored",
};

export class App extends Component {
  state = {
    text: '',
    page: 1,
    images: [],
    loading: false,
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
        if (result.totalHits === 0) {
          this.toastWarn();
          return this.setState({
            loading: false,
            isError: true,
          });
        };
        if (page === 1 && result.hits.length > 1) {
          this.toastSuccess();
        };
        this.setState(prevState => ({
          images: [...prevState.images, ...result.hits],
          loading: false,
          isError: false,
        }));
      } catch (error) {
        return this.toastError();
      };
    };
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
  toastSuccess = () => {
    return toast.success("Hooray! We found what you were looking for 🤗", toastSettings);
  };
  toastInfoNothing = () => {
    return toast.info("It looks like you want to find nothing, please check your query 😕", toastSettings);
  };
  toastInfoDuplication = () => {
    return toast.info("It looks like there are already pictures found for your request, please check if this will be a new search 🤔", toastSettings); 
  };
  toastWarn = () => {
    return toast.warn("Sorry, nothing was found for your request, try something else 🙈", toastSettings); 
  };
  toastError = () => {
    return toast.error("Oops, something went wrong, please try again 🙊", toastSettings);
  };

  render() {
    const { images, loading, isError } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchImages} toastInfo={this.toastInfoNothing} />
        {isError === true
          ? <ErrorImg />
          : <ImageGallery allImages={images} loading={loading} loadMoreImages={this.loadMoreImages} />
        }
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