import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientInApp } from "../../../services/types/data";

import BunConstructorElementStyles from "./BunConstructorElementStyles.module.css";

interface BunConstructorElementProps {
  bunSelected: TIngredientInApp;
  typeOfBun: "top" | "bottom" | undefined;
  extraText: string;
}

export const BunConstructorElement = ({
  bunSelected,
  typeOfBun,
  extraText,
}: BunConstructorElementProps) => {
  const { name, price, image } = bunSelected;
  return (
    <div className={BunConstructorElementStyles.element__container}>
      <ConstructorElement
        type={typeOfBun}
        isLocked={true}
        text={`${name} ${extraText}`}
        price={price}
        thumbnail={image}
      />
    </div>
  );
};
