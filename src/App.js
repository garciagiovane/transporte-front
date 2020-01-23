import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Header from './components/Header';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
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
