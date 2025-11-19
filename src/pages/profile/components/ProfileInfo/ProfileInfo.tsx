import { Form, useNavigate } from "react-router";
import classes from "./ProfileInfo.module.scss";
import Input from "../../../../shared/components/input/Input";
import { useAuthContext } from "../../../../context/AuthContext";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { type UpdateUserDto } from "../../../../types/dto";
import {
  confirmPasswordValidationRule,
  houseNumberRule,
  loginValidationRules,
  nonEmptyRule,
  passwordValidationRules,
} from "../../../../utils/validationRules";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import Select from "../../../../shared/components/select/Select";
import { streetMap } from "../../../../data/streetMap";
import Error from "../../../../shared/components/error/Error";
import { updateUser } from "../../../../api";
import { ArrowDown, X } from "react-bootstrap-icons";

const fieldsAreValid = (
  formData: UpdateUserDto,
  updatePassword: boolean
): boolean => {
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
  const passwordError = updatePassword
    ? passwordValidationRules(password)
    : null;
  const cityError = nonEmptyRule(city, "City");
  const streetError = nonEmptyRule(street, "Street");
  const houseNumberError = houseNumberRule(houseNumber);
  const paymentMethodError = nonEmptyRule(paymentMethod, "Payment method");
  const passwordsMatch = !updatePassword || confirmPassword === password;

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

const ProfileInfo = () => {
  const { user, setUser, logout } = useAuthContext();
  const [formData, setFormData] = useState<UpdateUserDto>({
    city: "",
    street: "",
    login: "",
    password: "",
    confirmPassword: "",
    paymentMethod: "",
    houseNumber: 0,
  });
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const streetsToChoose = useMemo(
    () =>
      streetMap[formData.city]?.map((street) => ({
        value: street,
        label: street,
      })) || [],
    [formData.city]
  );

  const changedFields = useMemo(() => {
    return Object.entries(formData).reduce((acc, [key, value]) => {
      const isPasswordField = key === "password" || key === "confirmPassword";
      const userValue = user?.[key as keyof typeof user];

      if (
        (isPasswordField && value) ||
        (!isPasswordField && value !== userValue && key)
      ) {
        acc[key] = value || "";
      }

      return acc;
    }, {} as Record<string, string | number>);
  }, [formData, user]);

  const handleSubmit = async (e: FormEvent) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    if (!isValid || !token) return;
    try {
      const data = await updateUser(
        { ...changedFields, login: user?.login },
        token
      );
      if (data) {
        localStorage.setItem("authToken", data.access_token);
        setUser(data.user);
      }
    } catch (err) {
      setError(`Failed to update user: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);
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

  useEffect(() => {
    if (!user) return;

    const unchanged = Object.entries(changedFields).length === 0;

    setIsValid(
      (updatePassword || !unchanged) && fieldsAreValid(formData, updatePassword)
    );
  }, [changedFields, formData, updatePassword, user]);

  if (!user) return <>You haven't registered yet</>;
  return (
    <section className={classes.profileInfo}>
      <Form state={formData} onSubmit={handleSubmit} className={classes.form}>
        {/* <Input
          type="text"
          name="login"
          id="login"
          label={t("login")}
          placeholder={t("placeholder")}
          value={formData.login}
          validationRule={loginValidationRules}
          onChange={handleChange}
        /> */}
        <h1 className={classes.profileTitle}>
          {t("welcome")}, {user.login}
        </h1>

        <div className={classes.passwordDropdown}>
          {!updatePassword && (
            <button
              className={cn(classes.btn, classes.openDropdown)}
              onClick={() => setUpdatePassword(true)}
            >
              {t("change_password")} <ArrowDown />
            </button>
          )}

          <div
            className={cn(classes.dropdownContent, {
              [classes.active]: updatePassword,
            })}
          >
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
              id="confirmPassword"
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

            <button
              className={cn(classes.btn, classes.closeDropdown)}
              onClick={() => setUpdatePassword(false)}
            >
              {t("cancel")}
              <X width={30} height={30} />
            </button>
          </div>
        </div>

        <Select
          name="city"
          label={t("city")}
          id="city"
          value={formData.city}
          onChange={handleChange}
          options={[
            { value: "", label: t("city_placeholder"), disabled: true },
            {
              value: "Adana",
              label: "Adana",
            },
            {
              value: "Ankara",
              label: "Ankara",
            },
            {
              value: "Istanbul",
              label: "Istanbul",
            },
          ]}
          formValue={formData.city}
          validationRule={nonEmptyRule}
          validationOptions={{ nonEmpty: true, fieldName: t("city") }}
        />

        <Select
          name="street"
          label={t("street")}
          id="street"
          value={formData.street}
          formValue={formData.street}
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
          className={cn(classes.btn, {
            [classes.invalid]: !isValid,
          })}
          type="submit"
          disabled={!isValid}
        >
          {t("update_info")}
        </button>

        {error && <Error message={error} />}
      </Form>

      <button
        className={cn(classes.btn, classes.logout)}
        onClick={handleLogout}
      >
        Log out
      </button>
    </section>
  );
};

export default ProfileInfo;
