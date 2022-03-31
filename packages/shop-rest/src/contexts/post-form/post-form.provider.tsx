import React, { useReducer } from "react";
import { PostFormContext } from "./post-form.context";

type Action =
  | { type: "HANDLE_ON_SELECT_CHANGE"; payload: any }
  | { type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA"; payload: any };

function reducer(state: any, action: Action): any {
  switch (action.type) {
    case "HANDLE_ON_SELECT_CHANGE":
      // Trường hợp không muốn xóa các ảnh trong state cũ đang có
      // if (action.payload.field == 'files') {
      //   return { 
      //     ...state, 
      //     [action.payload.field]: [action.payload.value, ...state.files] 
      //   };
      // }
      return { ...state, [action.payload.field]: action.payload.value };
    case "HANDLE_ON_CHANGE_ADDITIONAL_DATA":
      return {
        ...state,
        additionalInfo: {
          ...state.additionalInfo,
          [action.payload.field]: action.payload.value,
        }
      };
    default:
      return state;
  }
}

type PostFormProviderProps = {
  initData: any;
};

export const PostFormProvider: React.FunctionComponent<PostFormProviderProps> = ({
  children,
  initData,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initData });
  return (
    <PostFormContext.Provider value={{ state, dispatch }}>
      {children}
    </PostFormContext.Provider>
  );
};
