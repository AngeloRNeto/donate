import Conta from './components/conta/Conta';
import Header from './components/itens/Header';
import Banner from './components/itens/Banner';
import Cards from './components/itens/Cards';
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
