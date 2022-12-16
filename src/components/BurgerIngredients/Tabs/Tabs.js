import React from "react";
import PropTypes from "prop-types";

import TabsStyles from "./TabsStyles.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export const Tabs = ({
  bunsShown,
  saucesShown,
  fillingsShown,
  onBunsClick,
  onSaucesClick,
  onFillingsClick,
}) => {
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

Tabs.propTypes = {
  bunsShown: PropTypes.bool.isRequired,
  saucesShown: PropTypes.bool.isRequired,
  fillingsShown: PropTypes.bool.isRequired,
  onBunsClick: PropTypes.func.isRequired,
  onSaucesClick: PropTypes.func.isRequired,
  onFillingsClick: PropTypes.func.isRequired,
};
