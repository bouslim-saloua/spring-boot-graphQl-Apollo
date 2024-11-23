import React from "react";
import services from "../services";
import { useQuery } from "@apollo/client";

export default function TotalSolde() {
    const { data, loading, error } = useQuery(services.TOTAL_SOLDES);

    if (loading) {
        return <p>Chargement des données...</p>;
    }

    if (error) {
        return <p>Une erreur est survenue : {error.message}</p>;
    }

    const totalSolde = data?.totalSolde || {};

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div
                        className="card text-white bg-success mb-3"
                        style={{ maxWidth: "18rem", minHeight: "150px" }}
                    >
                        <div className="card-header">Somme des soldes</div>
                        <div className="card-body">
                            <h5 className="card-title">{totalSolde.sum ?? "N/A"}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div
                        className="card text-white bg-info mb-3"
                        style={{ maxWidth: "18rem", minHeight: "150px" }}
                    >
                        <div className="card-header">Moyenne des soldes</div>
                        <div className="card-body">
                            <h5 className="card-title">{totalSolde.average ?? "N/A"}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div
                        className="card text-white bg-dark mb-3"
                        style={{ maxWidth: "18rem", minHeight: "150px" }}
                    >
                        <div className="card-header">Nombre total des comptes</div>
                        <div className="card-body">
                            <h5 className="card-title">{totalSolde.count ?? "N/A"}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
