import React from 'react';
import Modal from 'react-modal';
import useLocalStorage from '../../../useLocalStorage.js';
import './Header.css';
import Conta from '../../conta/Conta.js'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Header() {
    const [open, setOpen] = React.useState(false);
    const [logado, setLogado] = useLocalStorage("_logado");

    return (
        <header>
            <nav id="menu-h">
                <ul>
                    <li><a>DONATE</a></li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Quem Somos</a></li>
                    {!logado &&
                        (<li><a href="#" onClick={() => setOpen(true)}>Entrar</a></li>)}
                    {logado &&
                        (<li>
                            <div>
                                <p>{logado.nome}</p>
                                <small>{logado.address}</small>
                            </div>
                        </li>)}
                </ul>
            </nav>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                style={customStyles}
                contentLabel="Modal de cadastro">
                <Conta></Conta>
            </Modal>
        </header>
    );

};


export default Header;
