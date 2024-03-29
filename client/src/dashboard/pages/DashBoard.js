import DashboardLayout from "../layout/DashboardLayout";
import CardLineChart from "../components/Charts/CardLineChart";
import CardBarChart from "../components/Charts/CardBarChart";
import Activities from "../components/Charts/Activities";
import classNames from "classnames";
import { useEffect, useState } from "react";
import * as API from "../Redux/Dashboard/api";

const DashBoard = ({ isOpen, setIsOpen, theme }) => {
  const [bloggers, SetBloggers] = useState([]);

  useEffect(() => {
    const topBloggers = async () => {
      const bloggersList = await API.getTopBloggers();
      SetBloggers(bloggersList.data.results);
    };
    topBloggers().catch((e) => console.log(e.msg));
  }, []);

  return (
    <DashboardLayout isOpen={isOpen} setIsOpen={setIsOpen} theme={theme}>
      <main className="h-[100%] m-0 p-0">
        <div
          className={classNames(
            "fixed w-[50%] h-[50%] top-20 left-0",
            theme === "dark" && "bg-gray-800"
          )}
        >
          <CardBarChart theme={theme} />
        </div>
        <div
          className={classNames(
            "fixed w-[50%] h-[50%] top-20 left-[50%]",
            theme === "dark" && "bg-gray-800"
          )}
        >
          <CardLineChart theme={theme} />
        </div>
        <div className="fixed w-[50%] h-[50%] top-[50%] left-0">
          <Activities theme={theme} />
        </div>
        <div
          className={classNames(
            "fixed w-[50%] h-[50%] top-[50%] left-[50%] ",
            theme === "dark" && "bg-gray-800"
          )}
        >
          <div
            className={classNames(
              "p-6 pb-0 mb-0 bg-gray-50",
              theme === "dark" && "bg-gray-800"
            )}
          >
            <h6
              className={classNames(
                "flex justify-center px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-gray-900 opacity-70",
                theme === "dark" && "text-slate-50 opacity-100"
              )}
            >
              TOP Bloggers
            </h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Author
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      roles
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      total posts
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      total comments
                    </th>
                    <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                  </tr>
                </thead>
                <tbody>
                  {bloggers.map((user, i) => {
                    const {
                      fullName,
                      userName,
                      roles,
                      postCount,
                      commentCount,
                      email,
                      img,
                    } = user;
                    return (
                      <tr key={i}>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div>
                              <img
                                src={img}
                                className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
                                alt="user1"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 leading-normal text-sm">
                                {userName}
                              </h6>
                              <p className="mb-0 leading-tight text-xs text-slate-400">
                                {email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <p className="mb-0 font-semibold leading-tight text-xs">
                            {roles}
                          </p>
                          <p className="mb-0 leading-tight text-xs text-slate-400">
                            {fullName}
                          </p>
                        </td>
                        <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                          <span
                            className={classNames(
                              "bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-gray-900",
                              theme === "dark" && "text-slate-50"
                            )}
                          >
                            {postCount}
                          </span>
                        </td>
                        <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                          <span
                            className={classNames(
                              "bg-gradient-to-tl px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-gray-900",
                              theme === "dark" && "text-slate-50"
                            )}
                          >
                            {commentCount}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
  // return <>DashBoard{/* <UserList isOpen={isOpen} userList={userList} /> */}</>;
};

export default DashBoard;
