import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ShowBusList = (props) => {
    var buslines = props.buslines
    if (buslines.length) {
        return (
            <ul>
                {buslines.map(busLine => <li key={busLine.id}>{busLine.name}</li>)}
            </ul>
        )
    }
    return <h2>Nenhuma linha encontrada</h2>
}

export class Home extends Component {
    constructor() {
        super()

        this.state = {
            latitude: '',
            longitude: '',
            buslines: []
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
            .catch(error => console.error('Erro na request: ' + error))
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
                <div>
                    <Link to={'/'}>Back</Link>
                </div>
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
                    <ShowBusList buslines={this.state.buslines} />
                </div>
            </div>
        )
    }
}