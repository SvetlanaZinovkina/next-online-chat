import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import routes from "../routes/routes";
import { setUser } from "@/store/slices/usersSlice";

const LoginPage = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const loginInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Неправильный формат email")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(5, "Минимум 5 знаков")
      .max(20, "Максимум 20 знаков")
      .required("Обязательное поле"),
  });

  const handleSubmit = async ({ email, password }, { resetForm }) => {
    try {
      const response = await login({ email, password });

      if (!response || response.error) {
        throw new Error(response.error || "Unknown error");
      }
      const { token, user_id, username, role, avatar_path } = response.data;

      dispatch(
        setUser({
          id: user_id,
          username,
          role,
          token,
          avatar_path,
        })
      );
      Cookies.set("token", token);
      router.push("/");

      resetForm();
    } catch (error) {
      if (error.statusCode === 409) {
        console.log("Ошибка регистрации");
        // notify(t("warnings.errSignup"));
        // setErrors({
        //   username: t("warnings.errSignup"),
        // });
        // notify(t("warnings.errNetwork"));
      }
    }
  };

  return (
    <article className="flex font-comfortaa flex-col bg-transparent rounded-3xl w-2/3 min-w-80 max-w-96 h-[600px] p-8 m-2 drop-shadow-md backdrop-opacity-10 ">
      <h1 className="text-xl my-10">
        Добро пожаловать в <br />
        Zino chat
      </h1>
      <div className="text-xs">
        <span className="text-zinc-400">Нет аккаунта?</span>
        <Link
          href={routes.signUpPage()}
          className="underline text-purple-500 ml-1"
        >
          Зарегистрироваться
        </Link>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginInSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className="flex flex-col gap-4 mt-10">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-1">
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
                placeholder="Введите ваш email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm mb-1">
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
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </article>
  );
};

export default LoginPage;
