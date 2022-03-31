import React, {useContext} from "react";
import {PostFormContext} from "../../contexts/post-form/post-form.context";
import styled from "styled-components";

export const TextBox = styled.textarea`
    margin-top: 20px;
    display: "block";
    width: 100%;
    background: #f7f7f7;
    border: 0;
    border-radius: 7px;
    margin-bottom: 20px;
    height: 250px;
    font-size: 16px;
    font-family: monospace;
`;

const TextArea: React.FC<any> = (props) => {
    const { state, dispatch } = useContext(PostFormContext);
    return (
        <TextBox
            value={state.description}
            onChange={(e) => {
                let value = e.target.value

                dispatch({
                    type: 'HANDLE_ON_SELECT_CHANGE',
                    payload: { value, field: 'description' },
                });
            }}
        />
    );
}

export default TextArea;