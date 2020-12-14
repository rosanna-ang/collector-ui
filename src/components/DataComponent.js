import React, {useState} from 'react';
import PeopleDataComponent from './PeopleDataComponent';
import DemographicsDataComponent from './DemographicsDataComponent';
import UploadBatchDataFileComponent from './UploadBatchDataFileComponent';

function DataComponent() {
    const [subnavItem, setSubnavItem] = useState("people");

    function subnavClickHandler(item) {
        setSubnavItem(item);
    }

    let component = null;

    switch (subnavItem) {
        case "people":
            component = <PeopleDataComponent />
            break;
        case "demographics":
            component = <DemographicsDataComponent />;
            break;
        case 'uploadBatch':
            component = <UploadBatchDataFileComponent />;
            break;
    }

    return(
        <div class="row mt-5">
            <div class="col-12">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class={`nav-link ${subnavItem == "people" ? "active" : null}`} aria-current="page" href="#" onClick={() => {subnavClickHandler('people')}}>People</a>
                    </li>
                    <li class="nav-item">
                        <a class={`nav-link ${subnavItem == "demographics" ? "active" : null}`} href="#" onClick={() => {subnavClickHandler('demographics')}}>Demographics</a>
                    </li>
                    <li class="nav-item">
                        <a class={`nav-link ${subnavItem == "uploadBatch" ? "active" : null}`} href="#" onClick={() => {subnavClickHandler('uploadBatch')}}>Upload Batch Data File</a>
                    </li>
                </ul>
                <div class="mt-3">
                    {component}
                </div>
            </div>
        </div>
    );
}

export default DataComponent;