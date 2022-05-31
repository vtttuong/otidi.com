import React from "react";
import {
    ModalBackdrop,
    ModalWrapper,
    ModalHeader,
    ModalBody
} from './avatar-modal.style';

export const AvatarModal = (props) => {
    const { show, onClose, children, title } = props;
    if (!show) {
        return null;
    }

    return (
        <>
            { show ?
                    <ModalBackdrop onClick ={onClose}
                                   className="back-drop">
                    </ModalBackdrop>
                : null
            }

            <ModalWrapper>
                <ModalHeader>
                    <h3>{title}</h3>
                    <span
                        className="close-modal-btn"
                        onClick={onClose}>×
                    </span>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalWrapper>
        </>
    );
}