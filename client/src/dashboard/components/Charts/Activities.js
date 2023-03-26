import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const Activities = ({ theme }) => {
  const commentsClass = classNames(
    "p-4 text-sm text-gray-800 rounded-lg bg-gray-50",
    theme === "dark" && "text-gray-300 bg-gray-800"
  );

  const titleClass = classNames(
    "flex justify-center px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-gray-900 opacity-70",
    theme === "dark" && "text-gray-300 opacity-100"
  );

  const mainClass = classNames("bg-gray-50", theme === "dark" && "bg-gray-800");
  return (
    <main className={mainClass}>
      <span className={titleClass}>Recent Activities</span>
      <div
        className={classNames(
          "p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50",
          theme === "dark" && " bg-gray-800 text-blue-400"
        )}
      >
        <span className="font-medium">less than a minute ago,</span> Mahasatwo
        just commented on your post
      </div>
      <div className={commentsClass}>
        <span className="font-medium">30 minutes ago, </span>Ronish reacted 😂
        to your comment
      </div>
      <div className={commentsClass} role="alert">
        <span className="font-medium">15 hours ago,</span> Anmol shared your
        post to Facebook, Great One Poojan !
      </div>
      <div className={commentsClass}>
        <span className="font-medium">4 days ago,</span> Artery disliked your
        reply "Messi"
      </div>
      <div className={commentsClass}>
        <span className="font-medium">5 days ago,</span> Bibek Liked your post
        "Gintama"
      </div>
      <Link
        to="/notifications"
        className={classNames(
          "flex justify-center cursor-pointer underline text-blue-900 hover:text-gray-800",
          theme === "dark" && "text-blue-400 hover:text-gray-300"
        )}
      >
        See more
      </Link>
      <br></br>
      <br></br>
    </main>
  );
};

export default Activities;
