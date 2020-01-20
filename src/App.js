import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header(props) {
  if (Array.isArray(props.message)) {
    return (
      <ul>
        {props.message.map(busLine => <li key={busLine.id}>{busLine.name}</li>)}
      </ul>
    )
  }
  return (<h1>Nenhuma linha carregada</h1>)
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buslines: []
    }
  }

  UNSAFE_componentWillMount() {
    axios.get('http://127.0.0.1:8080/v2/lines/local?latitude=-30.0180494&longitude=-51.1122259')
      .then(({ data }) => {
        this.setState({
          buslines: data.content
        })
      })
      .catch(error => console.error('Erro na request: ' + error))
  }

  render() {
    var busLines = this.state.buslines

    if (busLines.length === 0) {
      var messageBody = 'Nenhuma linha foi carregada'
    } else {
      messageBody = busLines
    }

    return (
      <div>
        <Header message={messageBody} />
        <Link to={'/home'}>Home</Link>
      </div>
    );
  }
}

export default App;
