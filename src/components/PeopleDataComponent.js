import React,{useState, useEffect} from 'react';
import {useAuthContext} from '../auth/AuthContext';
import Config from '../Config';
const axios = require('axios');

function PeopleDataComponent() {
    const {principal} = useAuthContext();
    const [tableData, setTableData] = useState([]);

    useEffect(async() => {
        try {
            const response = await axios.get(Config.backend+"/data/persons/list", principal.getRequestAuthHeader());
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((r) => {
                    return(
                        <tr>
                            <td>{r.id}</td>
                            <td>{r.firstName}</td>
                            <td>{r.lastName}</td>
                            <td>{r.dob}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default PeopleDataComponent;