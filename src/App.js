
import CompteList from './component/CompteList';
import AddCompte from './component/AddCompte';
import 'bootstrap/dist/css/bootstrap.min.css';
import TotalSolde from './component/TotalSoldes';

function App() {
  return (
    <div className="App">
      <h2 style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',}}><b>GESTION DES COMPTES</b></h2>
      <div className='container'> 
      <div className='row'>
      <div className='col-sm'>
      <AddCompte/>
      <br/>
      <TotalSolde/>
      </div>
      <div className='col-sm'>
      <CompteList/>
      </div>
      </div>
     </div>
      
    </div>
  );
}

export default App;
