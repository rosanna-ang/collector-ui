import React,{useState, useEffect} from 'react';
import {useAuthContext} from '../auth/AuthContext';
import Config from '../Config';
import PaginationComponent from './PaginationComponent';
const axios = require('axios');

function PeopleDataComponent() {
    const {principal} = useAuthContext();
    const [tableData, setTableData] = useState([]);
    const [pageDetails, setPageDetails] = useState();
    const [page, setPage] = useState(1);

    useEffect(async() => {
        try {
            const response = await axios.get(Config.backend+"/data/persons/list?page="+page, principal.getRequestAuthHeader());
            setTableData(response.data.entities);
            setPageDetails(response.data.page_details);
        } catch (e) {
            window.location = "/";
        }
        
    }, [page]);

    function onPageChange(pageNumber) {
        setPage(pageNumber);
    }

    return (
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Birth Certificate Number</th>
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
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <PaginationComponent onClick={onPageChange} currentPage={page} pageDetails={pageDetails} />
        </div>
    );
}

export default PeopleDataComponent;