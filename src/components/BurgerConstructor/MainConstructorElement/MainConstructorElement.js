import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/types";

import MainConstructorElementStyles from "./MainConstructorElementStyles.module.css";

export const MainConstructorElement = ({
  index,
  element,
  typeOfElement,
  onCloseClick,
  moveCard,
}) => {
  const { name, price, image } = element;
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "elementToDrag",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
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

MainConstructorElement.propTypes = {
  index: PropTypes.bool.isRequired,
  element: ingredientPropTypes.isRequired,
  typeOfElement: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
};
