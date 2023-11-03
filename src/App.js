import { Component } from 'react';
import Banner from './components/itens/banner/Banner.js';
import Cards from './components/itens/cards/Cards.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App" >
        <Banner></Banner>
        <Cards></Cards>
      </div>
    );
  }
}

export default App;
