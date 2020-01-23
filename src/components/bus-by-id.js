import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";

const DisplayErrors = (props) => {
    return (
        <div>
            <ul>
                {props.errors.map(error => <li key={props.errors.indexOf(error)}>{error.message}</li>)}
            </ul>
        </div>
    )
}

const DisplayContent = (props) => {
    return (
        <div>
            Linha: {props.line.name}, código: {props.line.code}
        </div>
    )
}

const HandleResponse = (props) => {
    if (props.errors.length > 0) {
        return <DisplayErrors errors={props.errors} />
    } else if (props.line) {
        return <DisplayContent line={props.line} />
    }
    return null;
}

class BusById extends Component {
    constructor() {
        super()

        this.state = {
            codigoLinha: '',
            errors: [],
            line: undefined
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        axios.get('http://127.0.0.1:8080/v2/lines/' + this.state.codigoLinha)
            .then(response => {
                this.setState({
                    line: response.data
                })
            })
            .catch(error => {
                if (error.response) {
                    var requestErrors = error.response.data.errors
                    console.log(error.response)
                    this.setState({
                        errors: requestErrors
                    })
                }
            })
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            codigoLinha: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Header />
                <h1>Pelo ID</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Código da linha</label>
                        <input type='text' value={this.state.codigoLinha} onChange={this.handleChange} name='codigoLinha' />
                    </div>
                    <button type='submit'>Enviar</button>
                </form>
                <div>
                    <HandleResponse errors={this.state.errors} line={this.state.line} />
                </div>
            </div>
        )
    }
}

export default BusById