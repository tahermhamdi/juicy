import React from "react";

export default class Search extends React.Component {
    onFieldChange(criteria) {
        this.setState({ criteria });
        this.props.onCriteriaChange(criteria);
    }

    render() {
        return (
            <div>
                <input
                    placeholder="Enter text to search for gifs!"
                    onChange={event => this.onFieldChange(event.target.value)}
                />
            </div>
        );
    }
}
