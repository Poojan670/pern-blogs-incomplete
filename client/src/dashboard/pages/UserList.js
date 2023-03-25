import React, { useState, useEffect } from "react";
import * as API from "../../Redux/Auth/api";
import DashboardLayout from "../layout/DashboardLayout";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

const UserList = ({ isOpen, setIsOpen }) => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const users = async () => {
      const userList = await API.userList(1, 10);
      setUserList(userList.data.results);
    };
    users().catch((e) => console.log(e.msg));
  }, []);

  return (
    <DashboardLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={
          isOpen
            ? "relative flex flex-col ml-[16rem] w-[90%] min-w-0 mb-0 mt-[5rem] break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
            : "relative flex flex-col ml-50 w-full min-w-0 mb-0 mt-[5rem] break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
        }
      >
        <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
          <h6 className="flex justify-center px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-blue-500 opacity-70">
            User's table
          </h6>
        </div>
        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="p-0 overflow-x-auto">
            <table
              className={
                isOpen
                  ? "items-center md:w-[62rem] lg:w-[104rem] mb-0 align-top border-gray-200 text-slate-500"
                  : "items-center w-full mb-0 align-top border-gray-200 text-slate-500"
              }
            >
              <thead className="align-bottom">
                <tr>
                  <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                    S.N
                  </th>
                  <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                    user
                  </th>
                  <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                    roles
                  </th>
                  <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                    Verified
                  </th>
                  <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                    created
                  </th>
                  <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user, i) => {
                  const { fullName, role, email, createdAt, img, isVerified } =
                    user;
                  return (
                    <tr key={i}>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <h6 className="absolute mb-2 -mt-3 leading-normal text-bold ml-6">
                          {i + 1}
                        </h6>
                      </td>
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
                              {fullName}
                            </h6>
                            <p className="mb-0 leading-tight text-xs text-slate-400">
                              {email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <p className="mb-0 font-semibold leading-tight text-xs">
                          {role}
                        </p>
                        <p className="mb-0 leading-tight text-xs text-slate-400">
                          Blogs
                        </p>
                      </td>
                      <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                        <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                          {isVerified ? <TiTick /> : <RxCross2 />}
                        </span>
                      </td>
                      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <span className="font-semibold leading-tight text-xs text-slate-400">
                          {createdAt?.substring(0, 10)}
                        </span>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <Link
                          to="/user/id"
                          className="font-semibold leading-tight text-xs text-slate-400"
                        >
                          {" "}
                          Edit{" "}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserList;
