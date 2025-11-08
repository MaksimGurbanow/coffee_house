import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import classes from "./SignIn.module.scss";
import cn from "classnames";
import Input from "../../shared/components/input/Input";
import {
  loginValidationRules,
  passwordValidationRules,
} from "../../utils/validationRules";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { login as loginRequest } from "../../api/index";
import Error from "../../shared/components/error/Error";
import { useTranslation } from "react-i18next";

const fieldsAreValid = (login: string, password: string): boolean => {
  const loginError = loginValidationRules(login);
  const passwordError = passwordValidationRules(password);

  return Boolean(!loginError && !passwordError);
};

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "login") setLogin(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    try {
      const data = await loginRequest({ login, password });
      if (data) {
        localStorage.setItem("authToken", data.access_token);
        setUser(data.user);
      }
    } catch {
      setError("Failed to log in");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  useEffect(() => {
    setIsValid(fieldsAreValid(login, password));
  }, [login, password]);

  return (
    <main className={classes.form}>
      <section className={classes.formSection}>
        <h1 className={classes.formH1}>{t("sign")}</h1>

        <div className={classes.formContainer}>
          <form className={classes.form} id="form-form" onSubmit={handleSubmit}>
            <Input
              name="login"
              label={t("login")}
              type="text"
              placeholder={t("placeholder")}
              id="login"
              value={login}
              onChange={handleChange}
              validationRule={loginValidationRules}
            />

            <Input
              label={t("password")}
              type="password"
              placeholder={t("placeholder")}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              validationRule={passwordValidationRules}
            />

            <button
              className={cn(classes.formSubmitBtn, {
                [classes.invalid]: !isValid,
              })}
              type="submit"
              disabled={!isValid}
            >
              {t("sign")}
            </button>
            {error && <Error message={error} />}
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
