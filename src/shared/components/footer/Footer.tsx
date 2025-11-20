import classes from "./Footer.module.scss";
import TelIcon from "../../../assets/telIcon.svg?react";
import AddressIcon from "../../../assets/addressIcon.svg?react";
import twitter from "../../../assets/twitter.svg?react";
import instagram from "../../../assets/instagram.svg?react";
import facebook from "../../../assets/facebook.svg?react";
import { Trans, useTranslation } from "react-i18next";

const Footer = () => {
  const socialMedias = [
    { Icon: twitter, id: 1 },
    { Icon: instagram, id: 2 },
    { Icon: facebook, id: 3 },
  ].map(({ ...Icon }) => Icon);
  const { t } = useTranslation();
  return (
    <footer className={classes.contacts} id="contacts">
      <div className={classes.container}>
        <div className={classes.medias}>
          <h2 className={classes.contactsTitle}>
            <Trans i18nKey="footer_title">
              Sip, Savor, Smile.
              <span className={classes.skewed}>It’s coffee time!</span>
            </Trans>
          </h2>

          <div className={classes.buttons}>
            {socialMedias.map((item) => (
              <button key={item.id} className={classes.mediaButton}>
                <item.Icon />
              </button>
            ))}
          </div>
        </div>

        <div className={classes.contactsInfo}>
          <h3>{t("contact_title")}</h3>
          <ul>
            <li>
              <a
                href="https://www.google.com/maps?q=8558+Green+Rd.,+Los+Angeles"
                target="_blank"
                className={classes.contactItem}
              >
                <AddressIcon />
                8558 Green Rd., <strong>LA</strong>
              </a>
            </li>
            <li>
              <a href="tel:+1(603)555-0123" className={classes.contactItem}>
                <TelIcon />
                +1 (603) 555-0123
              </a>
            </li>
            <li>
              <a id={classes.time}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5L10 10L15 10"
                    stroke="#E1D4C9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z"
                    stroke="#E1D4C9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("time")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
