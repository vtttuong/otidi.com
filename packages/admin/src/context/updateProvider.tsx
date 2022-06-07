import React from "react";
import {getUsers, getUsersType} from "service/use-users";
import Fuse from "fuse.js";
import UpdateContext from "./updateContext";
const options = {
  isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  minMatchCharLength: 2,
  keys: ["name"],
};

const UpdateProvider = (props) => {
  const [dataUsers, setDataUsers] = React.useState([]);
  const [dataSearch, setDataSearch] = React.useState([]);
  React.useEffect(() => {
    getUser();
  }, []);
  const searchN = (list, pattern) => {
    const fuse = new Fuse(list, options);
    return fuse.search(pattern).map((current) => current.item);
  };

  const searchName = async (text: string) => {
    if (text.length === 0) getUser();
    const results = searchN(dataSearch, text);
    setDataUsers(results);
  };
  const searchType = async (id: number) => {
    const results = await getUsersType(id);
    setDataUsers(results);
  };

  const getUser = async () => {
    const response = await getUsers();
    const users = response.data;
    console.log(users);

    setDataUsers(users);
    setDataSearch(users);
  };

  return (
    <UpdateContext.Provider
      value={{
        dataUsers: dataUsers,
        getUser: getUser,
        searchName: searchName,
        searchType: searchType,
      }}
    >
      {props.children}
    </UpdateContext.Provider>
  );
};
export default UpdateProvider;
