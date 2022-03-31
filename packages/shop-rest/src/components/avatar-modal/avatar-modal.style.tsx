import styled from "styled-components";

const ModalBackdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.5);
`;

const ModalWrapper = styled.div`
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 500px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    top: 30%;
    left: 35%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    border-radius: 10px;
`;

const ModalHeader = styled.div`
    padding: 5px 20px;
    text-align: center;
    display: flex;
    flex-direction: row;
    color: #41b4b4;
    
    h3 {
        margin: 0;
        padding: 0;
        flex: 31;
    }
    
    span {
        cursor: pointer;      
        font-size: 1.25rem;
        margin: 0;
        
        &:hover {
            color: red;
        }
    }

    @media (min-width: 600px) {
        .modal {
            width: 500px;
            left: calc(50% - 250px);
        }
    }
`;

const ModalBody = styled.div`
  padding: 10px 15px;
`;

export { ModalBackdrop, ModalWrapper, ModalHeader, ModalBody };