import React, { useState } from "react";
import { getUsers } from "service/use-users";
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
  // minMatchCharLength: 2,
  keys: ["name"],
};

const UpdateProvider = (props) => {
  const [dataUsers, setDataUsers] = React.useState([]);
  const [dataSearch, setDataSearch] = React.useState([]);
  const [dataSortType, setDataSortType] = React.useState("id");
  const [status, setS] = React.useState("");
  const [dataSortDir, setDataSortDir] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const COUNT = 10;

  const getUser = async () => {
    setLoading(true);
    const response = await getUsers({
      status: status,
      // sortDir: dataSortDir,
      page,
      count: COUNT,
    });
    setLoading(false);

    if (response) {
      setDataUsers(response.data);
      setDataSearch(response.data);
      setTotalPages(Math.ceil(response.total / COUNT));
    }
  };

  React.useEffect(() => {
    getUser();
  }, [status, dataSortDir, page]);

  const searchN = (list, pattern) => {
    const fuse = new Fuse(list, options);
    return fuse.search(pattern).map((current) => current.item);
  };

  const searchName = async (text: string) => {
    setPage(1);
    if (text.length === 0) getUser();
    const results = searchN(dataSearch, text);
    setDataUsers(results);
  };

  const sortDir = async (dir: string) => {
    setPage(1);
    setDataSortDir(dir.length !== 0 ? dir : "");
  };

  const searchPage = async (page: number) => {
    setPage(page > 0 ? page : 1);
  };

  const setStatus = async (status: string) => {
    setPage(1);
    setS(status);
  };

  return (
    <UpdateContext.Provider
      value={{
        dataUsers: dataUsers,
        getUser: getUser,
        searchName: searchName,
        setStatus: setStatus,
        sortDir: sortDir,
        page: page,
        setPage: searchPage,
        totalPages: totalPages,
        loading: loading,
      }}
    >
      {props.children}
    </UpdateContext.Provider>
  );
};
export default UpdateProvider;
