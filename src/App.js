import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (<h1>{props.message}</h1>)
}

class App extends Component {

  render() {
    return (
      <div>
        <Header message='BusPoa' />
        <div>
          <Link to={'/local-lines'}>Procurar linhas próximas</Link>
        </div>
        <div>
          <Link to={'/bus-by-id'}>Procurar linha pelo código</Link>
        </div>
      </div>
    );
  }
}

export default App;
