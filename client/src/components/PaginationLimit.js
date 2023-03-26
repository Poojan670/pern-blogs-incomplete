import React from "react";

const PaginationLimit = ({ postsPerPage, setPostsPerPage }) => {
  const handleChange = (e) => {
    const data = Number(e.target.value);
    setPostsPerPage(data);
  };
  return (
    <>
      <p className="fw-normal p-0 m-0">
        Show
        <span className="ml-1 mr-1">
          {" "}
          <select value={postsPerPage} onChange={handleChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="99999999">All</option>
          </select>
        </span>{" "}
        entries
      </p>
    </>
  );
};

export default React.memo(PaginationLimit);
