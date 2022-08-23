import React from "react";
import HeaderSkeleton from "./HeaderSkeleton";
import SidebarSkeleton from "./SidebarSkeleton";

const RouteSkeleton = () => {
  return (
    <>
      <HeaderSkeleton />
      <div className="container-fluid">
        <div className="row p-0">
          <SidebarSkeleton />
        </div>
      </div>
    </>
  );
};

export default RouteSkeleton;
