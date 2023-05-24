import './Conta.css';

function Conta() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-25">
                    <label>Nome Completo</label>
                </div>
                <div className="col-75">
                    {/* <input type="text" id="fname" name="firstname" placeholder="Your name.."> */}
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label>Pais</label>
                </div>
                <div className="col-75">
                    <select id="country" name="country">
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label>Objetivo</label>
                </div>
                <div className="col-75">
                    <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
                </div>
            </div>
            <div className="row">
                {/* <input type="submit" value="Submit"> */}
            </div>
        </div>
    );
};


export default Conta;
