import React, {useState} from 'react';
import Config from '../Config';

function PaginationComponent(props) {
    var pageBound = Config.pageBound;
    var pageChangeHandler = props.onClick;
    var currentPage = props.currentPage;
    var pageDetails = props.pageDetails;

    if (pageDetails && pageDetails.total_pages > 1) {
        var availablePages = [];

        var lowerBound = currentPage - pageBound;
        var upperBound = currentPage + pageBound;
    
        if (lowerBound <= 0) {
            lowerBound = 1;
        }
    
        if (upperBound > pageDetails.total_pages) {
            upperBound = pageDetails.total_pages;
        }
    
        for(var i=lowerBound;i<=upperBound;i++) {
            availablePages.push(i);
        }

        return (
            <nav>
                <ul class="pagination">
                    <li class={`page-item ${pageDetails.first_page ? "disabled" : null}`}>
                        <a class="page-link" href="#" onClick={() => { if (!pageDetails.first_page) pageChangeHandler(1);}}>First</a>
                    </li>
                    <li class={`page-item ${!pageDetails.previous ? "disabled" : null}`}>
                        <a class="page-link" href="#" onClick={() => {if (pageDetails.previous) pageChangeHandler(currentPage - 1);}}>Previous</a>
                    </li>
                        {availablePages.map((i) => {
                            return (
                                <li class={`page-item ${i == currentPage ? "active" : null}`}>
                                    <a class="page-link" href="#" onClick={() => { if (i != currentPage) pageChangeHandler(i);}}>{i}</a>
                                </li>
                            );
                        })}
                    <li class={`page-item ${!pageDetails.next ? "disabled" : null}`}>
                        <a class="page-link" href="#" onClick={() => { if (pageDetails.next) pageChangeHandler(currentPage + 1)}}>Next</a>
                    </li>
                    <li class={`page-item ${pageDetails.last_page ? "disabled" : null}`}>
                        <a class="page-link" href="#" onClick={() => { if (!pageDetails.last_page) pageChangeHandler(pageDetails.total_pages)}}>Last</a>
                    </li>
                </ul>
            </nav>
        );
    }

    return null;
}

export default PaginationComponent;