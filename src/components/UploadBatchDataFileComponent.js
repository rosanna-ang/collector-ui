import React, {useState, useEffect} from 'react';
import {useAuthContext} from '../auth/AuthContext';
import Config from '../Config';
const axios = require('axios');

function UploadBatchDataFileComponent() {
    const UPLOAD_ERROR = "upload_error";
    const UPLOAD_SUCCESS = "upload_success";
    const [availableHandlers, setAvailableHandlers] = useState([]);
    const [handler, setHandler] = useState();
    const [batchFile, setBatchFile] = useState(null);
    const {principal} = useAuthContext();
    const [check, setCheck] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    useEffect(async() => {
        const handlersRequest = await axios.get(Config.backend+"/data/available-handlers", principal.getRequestAuthHeader());
        setAvailableHandlers(handlersRequest.data.items);
    });

    async function doUpload(e) {
        e.preventDefault();
        setCheck(true);

        console.log("date file: "+isInvalidDataFile()+": "+batchFile);
        console.log("type: "+isInvalidHandlerType()+": "+handler);

        if (!isInvalidDataFile() && !isInvalidHandlerType()) {
            const formData = new FormData();
            formData.append("type", handler);
            formData.append("file", batchFile);

            try {
                const uploadResponse = await axios.post(Config.backend+"/data/upload-batch-data-file", formData, principal.getRequestAuthHeader("multipart/form-data"));
                setHandler("0");
                setBatchFile(null);
                setCheck(false);
                setUploadStatus(UPLOAD_SUCCESS);
            } catch (e) {
                console.log(e);
                setUploadStatus(UPLOAD_ERROR);
            }
        }
    }

    function isInvalidHandlerType() {
        return !handler || handler == "0" || handler.length == 0;
    }

    function isInvalidDataFile() {
        return !batchFile;
    }

    function isUploadStatusAvailable() {
        return uploadStatus && (uploadStatus == UPLOAD_SUCCESS || uploadStatus == UPLOAD_ERROR);
    }

    let alert = null;

    if (isUploadStatusAvailable()) {
        switch (uploadStatus) {
            case UPLOAD_SUCCESS:
                alert = <div class="mb-3 alert alert-success">Data File uploaded successfully</div>
                break;
            case UPLOAD_ERROR:
                alert = <div class="mb-3 alert alert-danger">An unexpected error has occurred, please try again</div>
                break;
        }
    }

    return (
        <form onSubmit={doUpload}>
            {alert}
            <div class="mb-3">
                <label for="dataFile" class="form-label">Data File</label>
                <input type="file" class={`form-control form-control-lg ${check && isInvalidDataFile() ? "is-invalid" : null}`} onChange={e => setBatchFile(e.target.files[0])} />
                {check && isInvalidDataFile() ? <div class="invalid-feedback">Data File is required</div> : null}
            </div>
            <div class="mb-3">
                <label for="handlers" class="form-label">Handler Type</label>
                <select class={`form-select form-select-lg ${check && isInvalidHandlerType() ? "is-invalid" : null}`} onChange={e => setHandler(e.target.value)} defaultValue="0" value={handler}>
                    <option value="0">Select Handler Type</option>
                    {availableHandlers.map((item) => {
                        return (
                            <option value={item}>{item}</option>  
                        );
                    })}
                </select>
                {check && isInvalidHandlerType() ? <div class="invalid-feedback">Handler Type is required</div> : null}
            </div>
            <button class="btn btn-primary" type="submit">Upload</button>
        </form>
    );
}

export default UploadBatchDataFileComponent;