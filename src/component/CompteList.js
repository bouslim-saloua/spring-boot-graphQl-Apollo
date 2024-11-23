import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import services from "../services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CompteList() {
    const [ftype, setFtype] = useState(''); 
    const { data, loading, error, refetch } = useQuery(services.GET_ALL_COMPTES); 
    const [deleteCompte] = useMutation(services.DELETE_COMPTE, {
        refetchQueries: [{ query: services.GET_ALL_COMPTES }, { query: services.TOTAL_SOLDES }], 
    });

    if (loading) return <div className="spinner-border text-primary" role="status"><span className="sr-only">Chargement...</span></div>;
    if (error) return <div className="alert alert-danger" role="alert">Erreur: {error.message}</div>;

    const filteredComptes = data?.allComptes?.filter(compte => compte.type === ftype || ftype === '') || [];

    const handleDelete = (id) => {
        if (!id) {
            toast.error("ID du compte manquant !");
            return;
        }

        deleteCompte({
            variables: { id },
        })
        .then(() => {
            toast.success('Compte supprimé avec succès!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            refetch(); 
        })
        .catch((error) => {
            console.error("Erreur GraphQL:", error);
            toast.error('Erreur lors de la suppression du compte!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    return (
        <div>
            <h2>Liste des comptes</h2>
            <div className="form-group">
                <label>Filtrer par le type du compte </label>
                <select value={ftype} onChange={(e) => setFtype(e.target.value)} className="form-control">
                    <option value="">Tous</option>
                    <option value="COURANT">COURANT</option>
                    <option value="EPARGNE">EPARGNE</option>
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">DATE CRÉATION</th>
                        <th scope="col">TYPE</th>
                        <th scope="col">SOLDE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComptes.map((compte) => (
                        <tr key={compte.id}>
                            <th scope="row">{compte.id}</th>
                            <td>{compte.dateCreation}</td>
                            <td>{compte.type}</td>
                            <td>{compte.solde}</td>
                            <td> 
                                <button className="btn btn-danger" onClick={() => handleDelete(compte.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}
