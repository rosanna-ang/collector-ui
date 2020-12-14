import React,{useState, useEffect} from 'react';
import {useAuthContext} from '../auth/AuthContext';
import Config from '../Config';
import PaginationComponent from './PaginationComponent';
const axios = require('axios');

function DemographicsDataComponent() {
    const {principal} = useAuthContext();
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageDetails, setPageDetails] = useState();

    useEffect(async() => {
        try {
            const response = await axios.get(Config.backend+"/data/demographics/list?page="+page, principal.getRequestAuthHeader());
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
        <div>
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
            <PaginationComponent onClick={onPageChange} currentPage={page} pageDetails={pageDetails} />
        </div>
    );
}

export default DemographicsDataComponent;