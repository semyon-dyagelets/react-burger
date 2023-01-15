import TabsStyles from "./TabsStyles.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface TabsProps {
  bunsShown: boolean;
  fillingsShown: boolean;
  saucesShown: boolean;
  onBunsClick: () => void;
  onFillingsClick: () => void;
  onSaucesClick: () => void;
}

export const Tabs = ({
  bunsShown,
  saucesShown,
  fillingsShown,
  onBunsClick,
  onSaucesClick,
  onFillingsClick,
}: TabsProps) => {
  return (
    <div className={TabsStyles.tabs}>
      <Tab value="one" active={bunsShown} onClick={onBunsClick}>
        Булки
      </Tab>
      <Tab value="two" active={saucesShown} onClick={onSaucesClick}>
        Соусы
      </Tab>
      <Tab value="three" active={fillingsShown} onClick={onFillingsClick}>
        Начинки
      </Tab>
    </div>
  );
};
