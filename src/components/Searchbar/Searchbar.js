import PropTypes from 'prop-types';
import { Component } from "react";

export class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        toastInfo: PropTypes.func.isRequired,
    };
    
    state = {
        text: '',
    };

    typeNewSearch = (event) => {
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value,
        });
    };
    onSubmitForm = (event) => {
        event.preventDefault();
        const { onSubmit, toastInfo } = this.props;
        const { text } = this.state;
        if (text.trim() === '') {
            return toastInfo();
        };
        onSubmit(text);
        this.reset();
    };
    reset = () => {
        this.setState({
            text: '',
        });
    };

    render() {
        const { text } = this.state;
        return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.onSubmitForm}>
                <button type="submit" className="SearchForm-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
                    </svg>
                    <span className="SearchForm-button-label">Search</span>
                </button>
                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="text"
                    value={text}
                    onChange={this.typeNewSearch}
                />
            </form>
            </header>
        );
    };
};