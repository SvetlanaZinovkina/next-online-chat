import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import routes from "../routes/routes";
import { useCreateUserMutation } from "@/store/api";
import { setUser } from "@/store/slices/userSlice";

const SignUpPage = () => {
  const [createUser] = useCreateUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Минимум 2 знаков")
      .max(20, "Максимум 20 знаков")
      .required("Обязательное поле"),
    email: Yup.string()
      .email("Неправильный формат email")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(5, "Минимум 5 знаков")
      .max(20, "Максимум 20 знаков")
      .required("Обязательное поле"),
  });

  const handleSubmit = async ({ userName, email, password }, { resetForm }) => {
    try {
      const response = await createUser({ userName, email, password });
      if (!response || response.error) {
        throw new Error(response.error || "Unknown error");
      }
      const { token, user_id, username, role, avatar_path } = response.data;
      Cookies.set("token", token);
      dispatch(setUser({ token, id: user_id, username, role, avatar_path }));

      router.push(routes.mainPage());

      resetForm();
    } catch (error) {
      if (error.statusCode === 409) {
        console.log("Ошибка регистрации");
      }
    }
  };

  return (
    <article className="flex flex-col bg-transparent rounded-3xl w-2/3 min-w-80 max-w-96 h-[700px] p-8 m-2 drop-shadow-md backdrop-opacity-10 ">
      <h1 className="font-comfortaa text-xl my-10">Регистрация в Zino chat</h1>
      <div className="font-comfortaa text-xs">
        <span className="text-zinc-400">Уже есть аккаунт?</span>
        <Link
          href={routes.loginPage()}
          className="underline text-purple-500 ml-1"
        >
          Войти
        </Link>
      </div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
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
                autoFocus
                className={`p-3 rounded-lg border text-black ${
                  errors.email && touched.email
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
                type="text"
                autoFocus
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
                type="password"
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

            <button
              type="submit"
              disabled={!dirty || !isValid}
              className={`m-4 p-3 rounded-3xl text-white transition duration-300 ${
                !dirty || !isValid
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              Регистрация
            </button>
          </Form>
        )}
      </Formik>
    </article>
  );
};

export default SignUpPage;
