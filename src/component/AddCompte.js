import { useMutation} from "@apollo/client";
import React, { useState } from "react";
import services from "../services";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCompte() {
    const [solde, setSolde] = useState('');
    const [type, setType] = useState('COURANT');
    const [addCompte] = useMutation(services.ADD_COMPTE,{
        refetchQueries: [{query: services.GET_ALL_COMPTES},{query: services.TOTAL_SOLDES}],
});
   
        const date = moment(); 
        const dateCr = date.format('YYYY/MM/DD');

        const handleSave = (e) => {
            e.preventDefault();
            addCompte({
                variables: {
                    compte: {
                        solde: parseFloat(solde),
                        dateCreation: dateCr,
                        type: type,
                    },
                },
                
            })      
            setSolde("");
            setType("COURANT"); 
                }
                
      
            
    
    return (
        <div>
             
             <form onSubmit={handleSave}>
            
            <h3>Ajouter un nouveau compte</h3>
          <div className="form-group">
            <label>Solde </label>
            <input
              type="number"
              value={solde}
              className="form-control"
              onChange={(e) => setSolde(e.target.value)}
              required
            />
          </div>
          <br/>
          <div className="form-group">
            <label>Type </label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="form-control">
              <option value="COURANT">COURANT</option>
              <option value="EPARGNE">EPARGNE</option>
            </select>
          </div>
          <br/>
          <button type="submit" className="btn btn-primary">Ajouter un nouveau compte</button>
          
        </form>
        </div>
       
        
      );
    
}
