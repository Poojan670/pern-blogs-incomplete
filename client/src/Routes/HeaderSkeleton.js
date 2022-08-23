import React from "react";
import Skeleton from "react-loading-skeleton";

const HeaderSkeleton = () => {
  return (
    <div className="row">
      <div className="col-2 p-0">
        <Skeleton height={50} />
      </div>
      <div className="col-6">
        <Skeleton height={50} />
      </div>
      <div className="col-3">
        <Skeleton height={50} />
      </div>
    </div>
  );
};

export default HeaderSkeleton;
