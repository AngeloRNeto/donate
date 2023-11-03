import './Conta.css';
import React, { useState } from 'react';
import carteiraService from '../../services/carteiraService.js';
import useLocalStorage from '../../useLocalStorage.js';

function Conta() {
    var _carteira = new carteiraService();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [newConta, setNewConta] = useState(false);
    const [logado, setLogado] = useLocalStorage("_logado");

    const CadastrarUsuario = async (e) => {
        e.preventDefault();
        await _carteira.criarNovaCarteiraWeb3(email, username, password, logarUsuarioCallback);
        console.log(true);
    };

    const LogarUsuario = async (e) => {
        e.preventDefault();
        await _carteira.loginCarteiraUsuario(username, password, logarUsuarioCallback);
        console.log(true);
    };

    const logarUsuarioCallback = (user) => {
        setLogado(user);
        window.location.reload(false);
    }

    return (
        (!newConta ?
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={LogarUsuario}>
                    <div className="input-container">
                        <label htmlFor="username">Nome de usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                <br />
                <p> Não possui cadastro? </p>
                <button type="button" onClick={(e) => setNewConta(true)}>Criar nova conta</button>
            </div>
            :
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={CadastrarUsuario}>
                    <div className="input-container">
                        <label htmlFor="email">Email do usuário</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="username">Nome de usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Cadastrar</button>
                    <br />
                    <p> Não possui cadastro? </p>
                    <button type="button" onClick={(e) => setNewConta(false)}>Voltar</button>
                </form>
            </div>
        )
    );
};


export default Conta;
