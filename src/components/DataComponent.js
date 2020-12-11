import React, {useState} from 'react';
import PeopleDataComponent from './PeopleDataComponent';
import DemographicsDataComponent from './DemographicsDataComponent';

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
    }

    return(
        <div class="row mt-5">
            <div class="col-12">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class={subnavItem == "people" ? "nav-link active" : "nav-link"} aria-current="page" href="#" onClick={() => {subnavClickHandler('people')}}>People</a>
                    </li>
                    <li class="nav-item">
                        <a class={subnavItem == "demographics" ? "nav-link active" : "nav-link"} href="#" onClick={() => {subnavClickHandler('demographics')}}>Demographics</a>
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