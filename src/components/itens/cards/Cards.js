import './Cards.css';
import iconCulture from '../../../img/icon-culture.png';
import iconReligion from '../../../img/icon-religion.png';
import iconHealth from '../../../img/icon-health.png';
import iconNature from '../../../img/icon-nature.png';

function Cards() {
    return (
        <div className="row">
            <div className="column">
                <div className="card" id="icon-nature" onClick={()=> showOscByType(1)}>
                    <img src={iconNature} width="80" height="80" alt="Ícone Natureza" />
                    <h3>Meio ambiente</h3>
                </div>
            </div>

            <div className="column">
                <div className="card" id="icon-health" onClick={()=> showOscByType(2)}>
                    <img src={iconHealth} width="80" height="80" alt="Ícone saúde" />
                    <h3>Saúde</h3>
                </div>
            </div>

            <div className="column">
                <div className="card" id="icon-culture" onClick={()=> showOscByType(3)}>
                    <img src={iconCulture} width="80" height="80" alt="Ícone cultura" />
                    <h3>Cultura e recreação</h3>
                </div>
            </div>

            <div className="column">
                <div className="card" id="icon-religion" onClick={()=> showOscByType(4)}>
                    <img src={iconReligion} width="80" height="80" alt="Ícone religioso" />
                    <h3>Religião</h3>
                </div>
            </div>
        </div>
    );
};

function showOscByType(type) {
    console.log(type);
}

export default Cards;
