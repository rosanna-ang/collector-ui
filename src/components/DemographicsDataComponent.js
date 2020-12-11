import React,{useState, useEffect} from 'react';
import {useAuthContext} from '../auth/AuthContext';
import Config from '../Config';
const axios = require('axios');

function DemographicsDataComponent() {
    const {principal} = useAuthContext();
    const [tableData, setTableData] = useState([]);

    useEffect(async() => {
        try {
            const response = await axios.get(Config.backend+"/data/demographics/list", {headers: {"Authorization": "Bearer "+principal.token}});
            setTableData(response.data.entities);
        } catch (e) {
            window.location = "/";
        }
        
    });

    return (
        <table class="table table-bordered table-dark table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Submission Time</th>
                    <th>Telephone</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((r) => {
                    return(
                        <tr>
                            <td>{r.id}</td>
                            <td>{r.person.firstName + " " + r.person.lastName}</td>
                            <td>{r.submissionTime}</td>
                            <td>{r.telephoneNumber}</td>
                            <td>{r.address}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default DemographicsDataComponent;