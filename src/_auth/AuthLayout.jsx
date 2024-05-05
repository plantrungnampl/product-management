import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

export const AuthLayout = () => {
  // const authentication = false;
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" replace />
      ) : (
        <section className="bg-white w-full h-screen flex flex-col justify-center items-center">
          <Outlet />
        </section>
      )}
    </>
  );
};
