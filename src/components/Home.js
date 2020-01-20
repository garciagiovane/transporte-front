import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
    constructor() {
        super()

        this.state = {
            latitude: 0,
            longitude: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        console.log(this.state.latitude)
        console.log(this.state.longitude)
    }

    handleChange(event) {
        var target = event.target
        var fieldName = target.name
        var fieldValue = target.value

        this.setState({
            [fieldName]: fieldValue
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Link to={'/'}>Back</Link>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>
                                Latitude: <input type='text' onBlur={this.handleChange} /*value={this.state.latitude}*/ name='latitude' placeholder='Latitude'></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Longitude: <input type='text' onBlur={this.handleChange} /*value={this.state.longitude}*/ name='longitude' placeholder='longitude'></input>
                            </label>
                        </div>
                        <input type='submit' value='Enviar'></input>
                    </form>
                </div>
            </div>
        )
    }
}