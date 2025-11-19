import { useEffect, useState } from "react";
import Tabs from "./components/Tabs/Tabs";
import type { ProfileTabId } from "../../types/types";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import OrderHistory from "./components/OrderHistory/OrderHistory";

const ActiveTab = ({ id }: { id: ProfileTabId }) => {
  if (id === "profile") return <ProfileInfo />;
  if (id === "orders") return <OrderHistory />;
  return <></>;
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ProfileTabId>("profile");

  useEffect(() => {
    const stored = sessionStorage.getItem("activeTab");
    if (stored && ["profile", "orders"].includes(stored)) {
      setActiveTab(stored as ProfileTabId);
    }
  }, []);
  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ActiveTab id={activeTab} />
    </>
  );
};

export default Profile;
