import './Cards.css';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import iconCulture from '../../../img/icon-culture.png';
import iconReligion from '../../../img/icon-religion.png';
import iconHealth from '../../../img/icon-health.png';
import iconNature from '../../../img/icon-nature.png';
import CarteiraService from '../../../services/carteiraService.js'
import CurrencyInput from 'react-currency-input-field';
import useLocalStorage from '../../../useLocalStorage.js';

function Cards() {
    var divs = [];
    var lstItens = [];
    var _carteiraService = new CarteiraService();
    var state = {
        showCarteiras: false,
        carteiras: []
    };
    const [open, setOpen] = React.useState(false);
    const [carteiras, setCarteiras] = React.useState({});
    const [carteiraModal, setCarteiraModal] = React.useState({});
    const [donate, setDonate] = React.useState('');
    const [logado, setLogado] = useLocalStorage("_logado");

    var customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const search = async () => {
        await _carteiraService.buscaCarteiras(_searchCallback);
    }
    const _searchCallback = async (_carteiras) => {
        state.showCarteiras = true;
        await _carteiraService.buscaSaldoCarteiras(_carteiras, _buscaSaldoCarteiraCallback);
    }
    const _buscaSaldoCarteiraCallback = (_carteiras) => {
        setCarteiras(_carteiras);
    }
    const donateValue = async (to, value) => {
        await _carteiraService.sendTransaction(logado.address, to, value, (hash) => {
            console.log(logado.address, to, value, hash);
        });
    };
    const openModal = (item) => {
        if (logado) {
            item.address = carteiras[item.position].address;
            item.balance = carteiras[item.position].balance;
            setCarteiraModal(item);
            setOpen(true);
        } else {
            // alerta login
        }
    }

    lstItens.push(itemConstructor("icon-nature", 1, "Meio Ambiente", "Ícone Natureza", iconNature));
    lstItens.push(itemConstructor("icon-health", 2, "Saúde", "Ícone saúde", iconHealth));
    lstItens.push(itemConstructor("icon-culture", 3, "Cultura e recreação", "Ícone cultura", iconCulture));
    lstItens.push(itemConstructor("icon-religion", 4, "Religião", "Ícone religioso", iconReligion));
    if (carteiras.length > 0) {
        lstItens.forEach(item => {
            divs.push(
                <div key={item.id} className="column">
                    <div className="card" id={item.id} onClick={() => openModal(item)}>
                        <img src={item.srcImg} width="80" height="80" alt={item.altName} />
                        <h3>{item.name}</h3>
                        {carteiras.length > 0 &&
                            (<small>{carteiras[item.position].address}</small>)}

                        {carteiras.length > 0 && (
                            <p> R$ {carteiras[item.position].balance}</p>)}
                    </div>
                </div >
            );
        });
    }

    useEffect(() => {
        search();
    }, []);

    return (
        <div className="row">{divs}
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                style={customStyles}
                contentLabel="Modal de doação">
                <div>
                    <h1>{carteiraModal.name} </h1>
                    <p>{carteiraModal.balance}</p>
                    <small>{carteiraModal.address}</small>

                </ div>
                <br></br>
                <div>
                    <label htmlFor="donate">Valor</label>
                    <CurrencyInput
                        id="donate"
                        name="donate"
                        placeholder="valor da doação"
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        decimalsLimit={2}
                        allowDecimals={true}
                        groupSeparator={','}
                        decimalSeparator={'.'}
                        onValueChange={(value, name) => setDonate(value)}
                    />
                </div>
                <br></br>
                <button onClick={() => donateValue(carteiraModal.address, donate)}>Doar</button>
            </Modal>
        </div>)
};

function itemConstructor(id, position, name, altName, srcImg) {
    return { id, position, name, altName, srcImg };
}

export default Cards;
