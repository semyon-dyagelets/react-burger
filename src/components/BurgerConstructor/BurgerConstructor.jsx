import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { createOrder } from "../../services/actions/order";
import {
  addBunFromIngredientToConstructor,
  addMainFromIngredientsToConstructor,
  DELETE_BUN_FROM_CONSTRUCTOR,
  DELETE_MAIN_FROM_CONSTRUCTOR,
  SET_NEW_ORDER_OF_MAINS,
} from "../../services/actions/constructor";
import { prepareIdsForOrder } from "../../utils/helpers";
import {
  DECREASE_INGREDIENT_COUNT,
  INCREASE_INGREDIENT_COUNT,
} from "../../services/actions/ingredients";
import { BunConstructorElement } from "./BunConstructorElement/BunConstructorElement";
import { MainConstructorElement } from "./MainConstructorElement/MainConstructorElement";

import BurgerConstructorStyles from "./BurgerConstructorStyles.module.css";

export const BurgerConstructor = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { mains, buns } = useSelector((state) => state.constructorState);
  const { userAuthorised } = useSelector((state) => state.userState);
  const hasIngridientsInOrder = mains.length && buns.length;
  const bunSelected = buns[0];
  const allIngredients = [...buns, ...mains];
  const totalPrice = allIngredients.reduce((acc, item) => acc + item.price, 0);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragItem = mains[dragIndex];
    if (dragItem) {
      const mainsArrayCopy = [...mains];
      const prevItem = mainsArrayCopy.splice(hoverIndex, 1, dragItem);
      mainsArrayCopy.splice(dragIndex, 1, prevItem[0]);
      dispatch({ type: SET_NEW_ORDER_OF_MAINS, payload: mainsArrayCopy });
      return mainsArrayCopy;
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredientToDrag",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
  });

  const onDropHandler = (ingredient) => {
    if (ingredient.type === "bun") {
      if (!buns.length) {
        dispatch(addBunFromIngredientToConstructor(ingredient));
        dispatch({ type: INCREASE_INGREDIENT_COUNT, payload: ingredient });
        return;
      }
      if (buns.length === 2 && ingredient._id === bunSelected._id) {
        return;
      }
      if (buns.length === 2 && ingredient._id !== bunSelected._id) {
        dispatch({ type: DELETE_BUN_FROM_CONSTRUCTOR });
        dispatch({ type: DECREASE_INGREDIENT_COUNT, payload: bunSelected });
        dispatch(addBunFromIngredientToConstructor(ingredient));
        dispatch({ type: INCREASE_INGREDIENT_COUNT, payload: ingredient });
        return;
      }
    }

    dispatch(addMainFromIngredientsToConstructor(ingredient));
    dispatch({ type: INCREASE_INGREDIENT_COUNT, payload: ingredient });
  };

  const deleteIngredient = (ingredient) => {
    dispatch({
      type: DELETE_MAIN_FROM_CONSTRUCTOR,
      payload: ingredient,
    });
    dispatch({
      type: DECREASE_INGREDIENT_COUNT,
      payload: ingredient,
    });
  };

  const handleCreateOrder = () => {
    if (!userAuthorised) {
      history.push("/login");
    }
    if (hasIngridientsInOrder) {
      const idsForOrder = prepareIdsForOrder(allIngredients);
      dispatch(createOrder(idsForOrder));
      openOrderModal();
    }
    return;
  };

  const openOrderModal = () => {
    setIsShowModal(true);
  };

  const closeOrderModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <section
        className={`${BurgerConstructorStyles.constructor} pt-25 pr-4 pl-4`}
      >
        <div className={BurgerConstructorStyles.elements} ref={dropTarget}>
          {bunSelected && (
            <BunConstructorElement
              typeOfBun="top"
              bunSelected={bunSelected}
              extraText="(верх)"
            />
          )}
          <ul
            className={`${BurgerConstructorStyles.elements__mainIngredients} custom-scroll`}
          >
            {mains.map((mainIngredient, index) => (
              <MainConstructorElement
                index={index}
                key={`key_${index}`}
                element={mainIngredient}
                typeOfElement="undefined"
                onCloseClick={() => deleteIngredient(mainIngredient)}
                moveCard={moveCard}
              />
            ))}
          </ul>
          {bunSelected && (
            <BunConstructorElement
              typeOfBun="bottom"
              bunSelected={bunSelected}
              extraText="(низ)"
            />
          )}
        </div>
        <div className={`${BurgerConstructorStyles.purchase__container} mt-10`}>
          <div className={`${BurgerConstructorStyles.price__container}, mr-10`}>
            <span className="text text_type_digits-medium">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleCreateOrder}
            disabled={!hasIngridientsInOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isShowModal && (
        <Modal
          onClose={closeOrderModal}
          className={`${BurgerConstructorStyles.modal__content_constructor} pt-30 pr-10 pb-30 pl-10`}
          buttonCloseClassName={`${BurgerConstructorStyles.modal__close_constructor}`}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
