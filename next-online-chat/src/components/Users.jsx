import React, { useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import routes from "@/routes/routes";
import { useDispatch } from "react-redux";
import { useGetUsersQuery } from "@/store/api";
import { setUsers } from "@/store/slices/usersSlice";
import Image from "next/image";

const Users = () => {
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersData) {
      dispatch(setUsers(usersData));
    }
  }, [dispatch, usersData]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Произошла ошибка при загрузке пользователей</div>;

  return (
    <div className="p-2 my-3 flex flex-col bg-transparent rounded-3xl w-1/3 min-w-full drop-shadow-md backdrop-opacity-10 min-h-20">
      <div className="ml-1">
        <UsersIcon className="w-7 h-7 inline mr-2" />
        <span>Друзья</span>
      </div>
      <div className="my-2 flex flex-row overflow-x-auto whitespace-nowrap">
        {usersData?.map((user) => (
          <div
            key={user.user_id}
            className="p-1 flex flex-col w-12 р-12 justify-center items-center hover:bg-purple-700 rounded-md m-1"
          >
            <Image
              src={`${routes.defaultHostPath()}${user.avatar_path}`}
              width={30}
              height={30}
              alt={`${user.username} avatar`}
              className="rounded-full"
            />
            <p className="w-full text-xs truncate overflow-hidden text-center">
              {user.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
