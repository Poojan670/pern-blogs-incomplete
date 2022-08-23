import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

const Message = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  return (
    <div className="account-pages my-5">
      <div className="container"></div>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card overflow-hidden">
            <div className="bg-primary waves-effect waves-light bg-soft">
              <div className="row">
                <div className="col-sm-7"></div>
                <div className="text-white p-4">
                  <h5 className="text-white">
                    A password reset token has been sent to the provided email
                    address
                  </h5>
                  {/* <button
                    className="btn btn-primary waves-effect waves-light mt-4 m-3"
                    onClick={handleClick}
                  >
                    Cancel{" "}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
