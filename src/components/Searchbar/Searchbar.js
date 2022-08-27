import { Component } from "react";

export class Searchbar extends Component {
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
        const { searchImages, toastInfo } = this.props;
        const { text } = this.state;
        if (text.trim() === '') {
            return toastInfo();
        };
        searchImages(text);
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
        <header className="searchbar">
            <form className="form" onSubmit={this.onSubmitForm}>
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>
                <input
                    className="input"
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