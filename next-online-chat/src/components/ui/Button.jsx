import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import routes from "@/routes/routes";
import { logoutUser } from "@/store/slices/userSlice";

const Button = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (params) => {
    Cookies.remove("token");
    dispatch(logoutUser());
    router.push(routes.loginPage());
  };
  return (
    <div className="flex justify-center items-center w-10 h-10 absolute top-3 right-10 bg-red-700 rounded-full">
      <button onClick={handleClick}>X</button>
    </div>
  );
};

export default Button;
