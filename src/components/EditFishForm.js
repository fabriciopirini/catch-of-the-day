import React, { Component } from "react";

export default class EditFishForm extends Component {
    handleChange = e => {
        const updatedFish = {
            ...this.props.fish,
            [e.currentTarget.name]: e.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    };

    render() {
        return (
            <React.Fragment>
                <div className="fish-edit">
                    <input
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={this.props.fish.name}
                    />
                    <input
                        type="text"
                        name="price"
                        onChange={this.handleChange}
                        value={this.props.fish.price}
                    />
                    <select
                        name="status"
                        onChange={this.handleChange}
                        value={this.props.fish.status}
                    >
                        <option value="available">Fresh!</option>
                        <option value="unavailable">Sold Out!</option>
                    </select>
                    <textarea
                        name="desc"
                        onChange={this.handleChange}
                        value={this.props.fish.desc}
                    />
                    <input
                        type="text"
                        name="image"
                        onChange={this.handleChange}
                        value={this.props.fish.image}
                    />
                    <button
                        onClick={() => this.props.deleteFish(this.props.index)}
                    >
                        Remove Fish
                    </button>
                </div>
            </React.Fragment>
        );
    }
}
