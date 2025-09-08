// src/pages/UnixConverter.jsx

import React, { useState } from 'react';
import axios from 'axios';

const UnixConverter = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });

    const handleConvert = async () => {
        if (!input.trim()) {
            showAlert('Please enter a value.', 'warning');
            return;
        }

        try {
            setResult('');
            setAlert({ message: '', type: '' });

            const response = await axios.get(
                `https://helloacm.com/api/unix-timestamp-converter/`,
                {
                    params: {
                        cached: '',
                        s: input.trim(),
                    },
                }
            );

            if (response.data === false) {
                showAlert('Invalid input format. Please enter a valid Unix timestamp or date string.', 'danger');
            } else {
                showAlert('Conversion successful!', 'success');
                setResult(response.data);
            }
        } catch (err) {
            showAlert('Error contacting the conversion API.', 'danger');
        }
    };

    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 10000);
    };

    return (
        <div className="container mt-5 text-center" >
            <h2 className="mb-4 text-center">Unix Timestamp Converter</h2>

            {alert.message && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            )}

             <div className="d-flex flex-column align-items-center" id="conv_inp_txt_area">
                <textarea
                    id="convertInput"
                    type="text"
                    className="form-control"
                    placeholder={`Enter date (YYYY-MM-DD hh:mm:ss)\nOr Unix timestamp`}
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <button onClick={handleConvert} className="btn btn-primary w-100" id="submitConvert">
                Convert
            </button>

            {result && (
                <div className="alert alert-info mt-4" role="alert">
                    <strong id="result" >Result:</strong> <div> {result} </div>
                </div>
            )}
        </div>
    );
};

export default UnixConverter;
