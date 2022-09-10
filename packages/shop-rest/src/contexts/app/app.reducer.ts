export const initialState = {
  searchTerm: "",
  isSticky: false,
  isSidebarSticky: true,
  isDrawerOpen: false,
  isRouting: false,
  brandId: null,
  modelId: null,
};

type ActionType =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_STICKY" }
  | { type: "REMOVE_STICKY" }
  | { type: "SET_SIDEBAR_STICKY" }
  | { type: "REMOVE_SIDEBAR_STICKY" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "SET_IS_ROUTING"; payload: boolean }
  | { type: "SET_BRAND_ID"; payload: number }
  | { type: "SET_MODEL_ID"; payload: number };

type StateType = typeof initialState;

export function appReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_IS_ROUTING":
      return {
        ...state,
        isRouting: action.payload,
      };

    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_STICKY":
      return {
        ...state,
        isSticky: true,
      };
    case "REMOVE_STICKY":
      return {
        ...state,
        isSticky: false,
      };
    case "SET_SIDEBAR_STICKY":
      return {
        ...state,
        isSidebarSticky: true,
      };
    case "REMOVE_SIDEBAR_STICKY":
      return {
        ...state,
        isSidebarSticky: false,
      };
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    case "SET_BRAND_ID":
      return {
        ...state,
        brandId: action.payload,
      };

    case "SET_MODEL_ID":
      return {
        ...state,
        modelId: action.payload,
      };

    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
