import React from "react";
import Skeleton from "react-loading-skeleton";

const SidebarSkeleton = () => {
  return (
    <div className="col-2 p-0 mt-5">
      <Skeleton count={20} height={30} />
    </div>
  );
};

export default SidebarSkeleton;
