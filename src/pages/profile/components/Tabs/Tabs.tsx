import { Cart, PersonCircle, type Icon } from "react-bootstrap-icons";
import classes from "./Tabs.module.scss";
import type { ProfileTabsProps } from "../../../../types/props";
import cn from "classnames";
import type { ProfileTabId } from "../../../../types/types";

const tabs: { id: ProfileTabId; label: string; Icon: Icon }[] = [
  { id: "profile", label: "Profile", Icon: PersonCircle },
  { id: "orders", label: "Orders", Icon: Cart },
  // { id: "settings", label: "Settings", Icon: Gear },
];

const Tabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => {
  const handleClick = (id: ProfileTabId) => {
    setActiveTab(id);
    sessionStorage.setItem("activeTab", id);
  };
  return (
    <div className={classes.tabs}>
      {tabs.map((tab) => (
        <button
          onClick={() => handleClick(tab.id)}
          className={cn(classes.tabButton, {
            [classes.active]: activeTab === tab.id,
          })}
          key={tab.id}
        >
          <span>{tab.label}</span>
          <tab.Icon width={30} height={30} />
        </button>
      ))}
    </div>
  );
};

export default Tabs;
