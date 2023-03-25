import React from "react";

const Activities = () => {
  return (
    <main>
      <span className="flex justify-center px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-gray-900 opacity-70">
        Recent Activities
      </span>
      <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400">
        <span className="font-medium">less than a minute ago,</span> Mahasatwo
        just commented on your post
      </div>
      <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
        <span className="font-medium">30 minutes ago, </span>Ronish reacted 😂
        to your comment
      </div>
      <div
        className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
        role="alert"
      >
        <span className="font-medium">15 hours ago,</span> Anmol shared your
        post to Facebook, Great One Poojan !
      </div>
      <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
        <span className="font-medium">4 days ago,</span> Artery disliked your
        reply "Messi"
      </div>
      <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
        <span className="font-medium">5 days ago,</span> Bibek Liked your post
        "Gintama"
      </div>
      <a
        href="/notifications"
        className="flex justify-center cursor-pointer underline text-blue-900"
      >
        See more
      </a>
    </main>
  );
};

export default Activities;
