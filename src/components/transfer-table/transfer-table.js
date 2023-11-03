import './transfer-table.css';
import CarteiraService from '../../services/carteiraService.js';

var _carteiraService = new CarteiraService();

function transferTable() {
  var transactions = _carteiraService.getTransactionsForAddress('');

  
  return (
    <table>
      <thead>
        <tr>
          <th className="center">Origem</th>
          <th className="center">Destino</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>São Paulo</td>
          <td>Rio de Janeiro</td>
        </tr>
      </tbody>
    </table>
  );
};


export default transferTable;
