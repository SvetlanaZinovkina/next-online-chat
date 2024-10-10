import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  updateUsername,
  updateEmail,
  updatePassword,
  updateAvatar,
} from "@/store/slices/userSlice";
import Cookies from "js-cookie";
import routes from "@/routes/routes.js";
import {
  useGetUserDataQuery,
  useEditUsernameMutation,
  useEditEmailMutation,
  useEditPasswordMutation,
  useEditAvatarMutation,
} from "@/store/api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
  const { data, error, isLoading } = useGetUserDataQuery();
  const [editUsername] = useEditUsernameMutation();
  const [editEmail] = useEditEmailMutation();
  const [editPassword] = useEditPasswordMutation();
  const [editAvatar] = useEditAvatarMutation();

  const router = useRouter();

  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки данных: {error.message}</div>;
  }

  const userData = data;
  const id = userData.user_id;

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Минимум 2 знаков")
      .max(20, "Максимум 20 знаков"),
    email: Yup.string().email("Неправильный формат email"),
    password: Yup.string()
      .min(5, "Минимум 5 знаков")
      .max(20, "Максимум 20 знаков"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (values.username !== userData.username) {
        const newUsername = values.username;
        const response = await editUsername({ id, newUsername });
        if (!response || response.error) {
          throw new Error(response.error || "Unknown error");
        }
        dispatch(updateUsername({ username: values.username }));
        router.push(routes.profilePage());
      }

      if (values.email !== userData.email) {
        const newEmail = values.email;
        const response = await editEmail({ id, newEmail });
        if (!response || response.error) {
          throw new Error(response.error || "Unknown error");
        }
        dispatch(updateEmail({ email: values.email }));
        router.push(routes.profilePage());
      }

      if (values.password) {
        const newPassword = values.password;
        const response = await editPassword({ id, newPassword });
        if (!response || response.error) {
          throw new Error(response.error || "Unknown error");
        }
        dispatch(updatePassword({ password: values.password }));
        router.push(routes.profilePage());
      }

      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        const response = await editAvatar({ id, formData });
        console.log(response);
        if (!response || response.error) {
          throw new Error(response.error || "Unknown error");
        }
        dispatch(updateAvatar({ avatar_path: response.data.avatar_path }));
        router.push(routes.profilePage());
      }

      resetForm();
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
    }
  };

  return (
    <article className="flex flex-col justify-center items-center bg-transparent rounded-3xl w-2/3 min-w-80 max-w-96 h-[700px] p-8 m-2 drop-shadow-md backdrop-opacity-10">
      <div>
        <Link
          href={routes.mainPage()}
          className="flex items-center justify-center p-1 w-10 h-10 rounded-full bg-purple-700"
        >
          <ArrowLeftIcon className="w-5 h-5 inline" />
        </Link>
      </div>
      <h1 className="font-comfortaa text-xl my-5">Личный кабинет</h1>
      <Image
        src={`${routes.defaultHostPath()}${userData.avatar_path}`}
        width={70}
        height={70}
        alt="Аватар"
        className="rounded-full"
      />
      <Formik
        initialValues={{
          username: userData.username || "",
          email: userData.email || "",
          password: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className="flex flex-col gap-4 mt-10">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-semibold mb-1">
                Имя пользователя
              </label>
              <Field
                name="username"
                type="text"
                className={`p-3 rounded-lg border text-black ${
                  errors.username && touched.username
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:border-purple-500`}
                placeholder="Введите имя пользователя"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold mb-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className={`p-3 rounded-lg border text-black ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:border-purple-500`}
                placeholder="Введите email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-semibold mb-1">
                Пароль
              </label>
              <Field
                name="password"
                type="text"
                className={`p-3 rounded-lg border text-black ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:border-purple-500`}
                placeholder="Введите пароль"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="avatar" className="text-sm font-semibold mb-1">
                Аватар
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setAvatar(event.currentTarget.files[0])}
                className="p-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className={
                "m-4 p-3 rounded-3xl text-white transition duration-300 bg-purple-500 hover:bg-purple-600"
              }
            >
              Сохранить изменения
            </button>
          </Form>
        )}
      </Formik>
    </article>
  );
};

export default ProfilePage;
