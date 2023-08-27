import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  //   console.log(logindata.userValidOne);

  const history = useNavigate();

  const dashfetchdata = async () => {
    const token = localStorage.getItem("userdatatoken");
    //     console.log("dash token   " + token);

    const data = await fetch("http://localhost:4000/validate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    //     console.log("response->  " + res);

    if (res.status === 401 || !res) {
      //       console.log("error page");
      history("*");
    } else if (res.status === 201) {
      //       console.log("user verify");
      setLoginData(res);
      history("/dash");
    }
  };

  useEffect(() => {
    dashfetchdata();
  });

  return (
    <>
      <div className="dash">
        <h1>DASHBOARD</h1>
        <br />
        User Id:soorajsingh7505@gmail.com
      </div>
    </>
  );
};

export default Dashboard;
