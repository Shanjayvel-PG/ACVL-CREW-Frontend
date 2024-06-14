import React from 'react';
import './logout.css';
import Button from '../../../Button';

function LogoutConfirmation({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal1">
            <div className="modal-content1">
                <h2>Logout Confirmation</h2>
                <p>Are you sure you want to log out?</p>
                <div className="buttons1">
                <Button title="Logout" onClick={onConfirm} />
                    <button title="Cancel" onClick={onClose}> Cancel </button>
                   
                </div>
            </div>
        </div>
    );
}

export default LogoutConfirmation;



