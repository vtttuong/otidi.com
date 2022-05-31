import React from 'react';
import styled from "styled-components";

const ButtonAvatar = styled.button`
    background-color: #41b4b4;
    border: none;
    color: #fff;
    padding: 8px 30px;
    font-size: 0.75rem;
    height: 30px;
    font-weight: bold;
    border-radius: 10px;

    .add-button {
        margin-left: 45%;
        margin-right: 10px;
    }
`;

export const Button = (props) => {
    const { title, onClick, buttonClass, childern, type} = props

    let classNames = ['button'];

    if (buttonClass) {
        classNames.push(buttonClass);
    }

    return (
        <ButtonAvatar
            type      ={type}
            className ={classNames.join(' ')}
            onClick   ={onClick}>

            {title}
            {childern}
        </ButtonAvatar>
    );
}