import Web3 from 'web3';

export default class CarteiraService {
    constructor() {
        var web3Provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/4f4b49ae01c14950a91326aefbebe74f");
        this.web3 = new Web3(web3Provider);
        this.web3.eth.getBlockNumber().then((result) => {
            console.log("Latest Ethereum Block is ", result);
          });
    }

    async buscaCarteiras(_callback) {
        // var accounts = await this.web3.eth.getAccounts();
        return _callback([]);
    }

    async buscaSaldoCarteiras(accounts, _callback) {
        var wallets = [];
        accounts.forEach(async (account, index) => {
            var newAccount = { address: account, balance: 0 };
            var balance = await this.web3.eth.getBalance(account);
            var weiBalance = this.web3.utils.fromWei(balance);
            var result = parseFloat(weiBalance).toString().split(".");
            if (result[1])
                newAccount.balance = Number(result[0] + "." + result[1].substring(0, 2)).toString();
            else
                newAccount.balance = Number(result[0]).toFixed(2);
            wallets.push(newAccount);

            if ((accounts.length - 1) === index)
                _callback(wallets);
        });
    }

    async criarNovaCarteiraWeb3(email, username, pwd, _callback) {
        var data = await this.createWallet();
        console.log(data.addr);
        return await this.criarNovaCarteiraDonate(email, username, pwd, data.addr, _callback);
    }

    async criarNovaCarteiraDonate(email, username, pwd, address, _callback) {
        var body = {
            address: address,
            nome: username,
            email: email,
            password: pwd
        };
        var response = await fetch('http://localhost:3300/wallets',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            });

        return _callback(body);
    }

    async loginCarteiraUsuario(email, password, _callback) {
        var response = await fetch('http://localhost:3300/wallets/login',
            {
                method: 'GET',
                headers: {
                    accept: '*/*',
                    'Content-type': 'application/json',
                    'email': email,
                    'password': password
                }
            });
        var carteira = await response.json();
        return _callback(carteira);
    }

    async getTransactionsForAddress(address) {
        const transactions = await this.web3.eth.getTransaction(address);
        return transactions;
    }

    async getTransactionsForAddresses(addressesToTrack) {
        for (const address of addressesToTrack) {
            const transactions = await this.getTransactionsForAddress(address);
            console.log(`Transações para ${address}:`);
            console.log(transactions);
        }
    }

    async sendTransaction(from, to, value) {
        this.web3.eth.getTransactionCount(from, (err, transactionCount) => {

            const transaction = {
                to: to,
                gasPrice: this.web3.utils.toHex("20000000000"),
                gasLimit: this.web3.utils.toHex(1000),
                nonce: this.web3.utils.toHex(transactionCount),
                value: this.web3.utils.toHex(this.web3.utils.toWei(value, "ether"))
            };

            // const common = new Common({ chain: 'sepolia', hardfork: "istanbul" })
            // const tx = FeeMarketEIP1559Transaction.fromTxData(transaction, { chain: 'sepolia', hardfork: "istanbul" });

            const private_key = Buffer.from("4fd69f4a711014f4e79c559bf6d5103ae72cbe0ec4d42ba034f25a7dc6dda3f6", "hex");
            // tx.sign(private_key);
            // console.log(tx);
            // //   Send signed transaction to the blockchain 
            // const sTx = tx.serialize();
            // const rawTransaction = "0x" + sTx.toString("hex");

            // this.web3.eth.sendSignedTransaction(rawTransaction, (err, hash) => {
            //     console.log("TxHash:" + hash);
            //     console.log(err);
            // });
        });


        // var privateKey = Buffer.from('4fd69f4a711014f4e79c559bf6d5103ae72cbe0ec4d42ba034f25a7dc6dda3f6', 'hex');
        // var rawTx = {
        //     nonce: '0x00',
        //     gasPrice: '20000000000',
        //     gasLimit: '20000',
        //     to: to,
        //     value: this.web3.utils.toHex(this.web3.utils.toWei(value, "ether")),
        //     data: ""
        // }

        // var transaction = new tx.Transaction(rawTx, { 'chain': 'ropsten' });
        // transaction.sign(privateKey);

        // await this.web3.eth
        //     .signTransaction({
        //         from: from,
        //         gasPrice: "20000000000",
        //         gas: "20000",
        //         to: to,
        //         value: value,
        //         data: ""
        //     })
        //     .then(console.log);

        // this.web3.eth
        //     .sendSignedTransaction(transaction)
        //     .on('transactionHash', function (hash) {
        //         console.log("has ===>" + hash);
        //     })
        //     .on('receipt', function (receipt) {
        //         console.log(receipt);
        //     })
        //     .on('confirmation', function (confirmationNumber, receipt) {
        //         console.log(confirmationNumber, receipt);
        //     })
        //     .on('error', console.error);
    }

    async createWallet() {
        try {

            this.web3.eth.accounts.create((err, createdAcc) => {
                if (err === null)
                    return {
                        data: {
                            addr: createdAcc.address,
                            privateKey1: createdAcc.privateKey.substr(2),
                            privateKey2: createdAcc.privateKey.substr(2)
                        }
                    };
                else throw { success: false, error: { message: "Wallet not created", stack: err } };
            })
        } catch (e) {
            console.log(e);
            return e;
        }
    };
}