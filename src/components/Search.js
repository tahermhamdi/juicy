import React from "react";

export default class Search extends React.Component {
    onFieldChange(criteria) {
        this.props.onCriteriaChange(criteria);
    }
    render() {
        return (
            <div>
                <input
                    placeholder="Search a Gift"
                    onChange={event => this.onFieldChange(event.target.value)}
                />
            </div>
        );
    }
}
