import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import classes from "./Register.module.scss";
import type { RegisterDto } from "../../types/dto";
import Input from "../../shared/components/input/Input";
import Select from "../../shared/components/select/Select";
import {
  confirmPasswordValidationRule,
  houseNumberRule,
  loginValidationRules,
  nonEmptyRule,
  passwordValidationRules,
} from "../../utils/validationRules";
import { register } from "../../api";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import cn from "classnames";
import { streetMap } from "../../data/streetMap";
import Error from "../../shared/components/error/Error";
import { useTranslation } from "react-i18next";

const fieldsAreValid = (formData: RegisterDto): boolean => {
  const {
    login,
    password,
    confirmPassword,
    city,
    street,
    houseNumber,
    paymentMethod,
  } = formData;

  const loginError = loginValidationRules(login);
  const passwordError = passwordValidationRules(password);
  const cityError = nonEmptyRule(city, "City");
  const streetError = nonEmptyRule(street, "Street");
  const houseNumberError = houseNumberRule(houseNumber);
  const paymentMethodError = nonEmptyRule(paymentMethod, "Payment method");
  const passwordsMatch = confirmPassword === password;

  return Boolean(
    !loginError &&
      !passwordError &&
      !cityError &&
      !streetError &&
      !houseNumberError &&
      !paymentMethodError &&
      passwordsMatch
  );
};

const Register = () => {
  const [formData, setFormData] = useState<RegisterDto>({
    login: "",
    password: "",
    confirmPassword: "",
    city: "",
    street: "",
    houseNumber: 0,
    paymentMethod: "cash",
  });
  const [isValid, setIsValid] = useState(false);
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const streetsToChoose = useMemo(
    () =>
      streetMap[formData.city]?.map((street) => ({
        value: street,
        label: street,
      })) || [],
    [formData.city]
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "houseNumber" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    try {
      const data = await register(formData);
      if (data) {
        localStorage.setItem("authToken", data.access_token);
        setUser(data.user);
      }
    } catch {
      setError("Failed to register");
    }
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [navigate, user]);

  useEffect(() => {
    setIsValid(fieldsAreValid(formData));
  }, [formData]);

  return (
    <main className={classes.form}>
      <section className={classes.formSection}>
        <h1 className={classes.formH1}>{t("registration")}</h1>

        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Input
              type="text"
              name="login"
              id="login"
              label={t("login")}
              placeholder={t("placeholder")}
              value={formData.login}
              validationRule={loginValidationRules}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              id="password"
              label={t("password")}
              placeholder={t("placeholder")}
              value={formData.password}
              validationRule={passwordValidationRules}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="confirmPassword"
              label={t("confirm_password")}
              placeholder={t("placeholder")}
              value={formData.confirmPassword}
              validationRule={confirmPasswordValidationRule}
              onChange={handleChange}
              validationOptions={{
                confirmPassword: true,
                password: formData.password,
              }}
            />

            <Select
              name="city"
              label={t("city")}
              id="city"
              value={formData.city}
              onChange={handleChange}
              options={[
                { value: "", label: t("city_placeholder"), disabled: true },
                { value: "Adana", label: "Adana" },
                { value: "Ankara", label: "Ankara" },
                { value: "Istanbul", label: "Istanbul" },
              ]}
              validationRule={nonEmptyRule}
              validationOptions={{ nonEmpty: true, fieldName: t("city") }}
            />

            <Select
              name="street"
              label={t("street")}
              id="street"
              value={formData.street}
              onChange={handleChange}
              options={[
                { value: "", label: t("street_placeholder"), disabled: true },
                ...streetsToChoose,
              ]}
              validationRule={nonEmptyRule}
              validationOptions={{ nonEmpty: true, fieldName: t("street") }}
            />

            <Input
              type="number"
              name="houseNumber"
              id="houseNumber"
              label={t("house")}
              placeholder={t("placeholder")}
              value={formData.houseNumber === 0 ? "" : formData.houseNumber}
              validationRule={houseNumberRule}
              onChange={handleChange}
            />

            <Input
              type="radio"
              radio
              value={formData.paymentMethod}
              validationRule={nonEmptyRule}
              validationOptions={{
                nonEmpty: true,
                fieldName: "Payment method",
              }}
              onChange={handleChange}
              label={t("pay_by")}
              radioValues={[
                { label: t("cash"), value: "cash", id: "cash" },
                { label: t("card"), value: "card", id: "card" },
              ]}
            />

            <button
              className={cn(classes.formSubmitBtn, {
                [classes.invalid]: !isValid,
              })}
              type="submit"
              disabled={!isValid}
            >
              {t("registration")}
            </button>

            {error && <Error message={error} />}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
