import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TIngredientInApp } from "../../../services/types/data";

import MainConstructorElementStyles from "./MainConstructorElementStyles.module.css";

interface MainConstructorElementProps {
  index: number;
  element: TIngredientInApp;
  typeOfElement: "top" | "bottom" | undefined;
  onCloseClick: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export const MainConstructorElement = ({
  index,
  element,
  typeOfElement,
  onCloseClick,
  moveCard,
}: MainConstructorElementProps) => {
  const { name, price, image } = element;
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "elementToDrag",
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      // @ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: "elementToDrag",
    item: element,
  });
  drag(drop(ref));
  return (
    <li className={MainConstructorElementStyles.element__container} ref={ref}>
      <div className={MainConstructorElementStyles.element__drag}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={typeOfElement}
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={onCloseClick}
      />
    </li>
  );
};
