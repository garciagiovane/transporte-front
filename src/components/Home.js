import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";

const DisplayContent = (props) => {
    return (
        <ul>
            {props.buslines.map(busLine => <li key={busLine.id}>{busLine.name}</li>)}
        </ul>
    )
}

const DisplayErrors = (props) => {
    return (
        <div>
            <ul>
                {props.errors.map(error => <li key={props.errors.indexOf(error)}>{error.message}</li>)}
            </ul>
        </div>
    )
}

const HandleResponse = (props) => {
    if (props.errors.length > 0) {
        return <DisplayErrors errors={props.errors} />
    } else if (props.buslines) {
        return <DisplayContent buslines={props.buslines} />
    }
}

export class Home extends Component {
    constructor() {
        super()

        this.state = {
            latitude: '',
            longitude: '',
            buslines: [],
            errors: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        axios.get(
            'http://127.0.0.1:8080/v2/lines/local?latitude='
            + this.state.latitude
            + '&longitude=' + this.state.longitude)
            .then(response => {
                this.setState({
                    buslines: response.data.content
                })
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        errors: error.response.data.errors
                    })
                }
            })
        event.preventDefault()
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
                <Header />
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>
                                Latitude: <input type='text' onChange={this.handleChange} value={this.state.latitude} name='latitude' placeholder='Latitude'></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Longitude: <input type='text' onChange={this.handleChange} value={this.state.longitude} name='longitude' placeholder='longitude'></input>
                            </label>
                        </div>
                        <input type='submit' value='Enviar'></input>
                    </form>
                </div>
                <div>
                    <HandleResponse errors={this.state.errors} buslines={this.state.buslines} />
                </div>
            </div>
        )
    }
}