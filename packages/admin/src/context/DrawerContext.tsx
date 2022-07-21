import { useCreateContext } from "./create-context";
import { ANCHOR } from "components/Drawer/Drawer";

const initialState = {
  isOpen: false,
  anchor: ANCHOR.right,
  drawerComponent: null,
  data: null,
  approvedPostId: null,
  saveId: null,
  deletedVoucherIds: null,
  createdVoucher: null,
  updatedVoucher: null,
  dataLength: null,
  savedBrand: null,
  maxId: null,
  createdUser: null,
};

type State = typeof initialState;
type Action = any;
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_DRAWER":
      return {
        ...state,
        isOpen: true,
        drawerComponent: action.drawerComponent,
        anchor: action.anchor ? action.anchor : ANCHOR.right,
        data: action.data,
        maxId: action.maxId,
      };
    case "CLOSE_DRAWER":
      return {
        ...state,
        isOpen: false,
        drawerComponent: null,
        data: null,
      };
    case "SAVE_APPROVE_POST_ID":
      return {
        ...state,
        approvedPostId: action.data,
      };
    case "SAVE_ID":
      return {
        ...state,
        saveId: action.data,
      };
    case "SAVE_DATA_LENGTH":
      return {
        ...state,
        dataLength: action.data,
      };
    case "SAVE_DELETED_ID":
      return {
        ...state,
        deletedVoucherIds: action.data,
      };
    case "SAVE_CREATED_VOUCHER":
      return {
        ...state,
        createdVoucher: action.data,
      };
    case "SAVE_UPDATED_VOUCHER":
      return {
        ...state,
        updatedVoucher: action.data,
      };
    case "SAVE_SAVED_BRAND":
      return {
        ...state,
        savedBrand: action.data,
      };
    case "SAVE_CREATED_USER":
      return {
        ...state,
        userCreated: action.data,
      };
    default:
      return state;
  }
}
const [useDrawerState, useDrawerDispatch, DrawerProvider] = useCreateContext(
  initialState,
  reducer
);

export { useDrawerState, useDrawerDispatch, DrawerProvider };
