import Conta from './components/conta/Conta';
import Header from './components/itens/header/Header';
import Banner from './components/itens/banner/Banner';
import Cards from './components/itens/cards/Cards';
import './App.css';

function App() {
  return (
    <div className="App">
        <Header></Header>
        <Banner></Banner>
        <Cards></Cards>
        {/* <Conta></Conta> */}
    </div>
  );
}

export default App;
