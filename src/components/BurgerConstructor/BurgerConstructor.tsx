import { useState } from "react";
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
  addBunToConstructorAction,
  addMainToConstructorAction,
  deleteBunToConstructorAction,
  deleteMainFromConstructorAction,
  setNewOrderOfMainsInConstructorAction,
} from "../../services/actions/constructor";
import {
  omitQuantityAddCustomId,
  prepareIdsForOrder,
} from "../../utils/helpers";
import { BunConstructorElement } from "./BunConstructorElement/BunConstructorElement";
import { MainConstructorElement } from "./MainConstructorElement/MainConstructorElement";

import BurgerConstructorStyles from "./BurgerConstructorStyles.module.css";
import { useAppDispatch, useAppSelector } from "../../services/types";
import {
  decreaseIngredientAction,
  increaseIngredientAction,
} from "../../services/actions/ingredients";
import { IngredientType, TIngredientInApp } from "../../services/types/data";

export const BurgerConstructor = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { mains, buns } = useAppSelector((state) => state.constructorState);
  const { userAuthorised } = useAppSelector((state) => state.userState);
  const constructorNotEmpty = mains.length || buns.length;
  const hasIngridientsInOrder = mains.length && buns.length;
  const bunSelected = buns[0];
  const allIngredients = [...buns, ...mains];
  const totalPrice = allIngredients.reduce((acc, item) => acc + item.price, 0);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragItem = mains[dragIndex];
    if (dragItem) {
      const mainsArrayCopy = [...mains];
      const prevItem = mainsArrayCopy.splice(hoverIndex, 1, dragItem);
      mainsArrayCopy.splice(dragIndex, 1, prevItem[0]);
      dispatch(setNewOrderOfMainsInConstructorAction(mainsArrayCopy));
      return mainsArrayCopy;
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredientToDrag",
    drop(ingredient: TIngredientInApp) {
      onDropHandler(ingredient);
    },
  });

  const onDropHandler = (ingredient: TIngredientInApp) => {
    if (ingredient.type === IngredientType.BUN) {
      if (!buns.length) {
        dispatch(
          addBunToConstructorAction(omitQuantityAddCustomId(ingredient))
        );
        dispatch(increaseIngredientAction(ingredient));
        return;
      }
      if (buns.length === 2 && ingredient._id === bunSelected._id) {
        return;
      }
      if (buns.length === 2 && ingredient._id !== bunSelected._id) {
        dispatch(deleteBunToConstructorAction());
        dispatch(decreaseIngredientAction(bunSelected));
        dispatch(
          addBunToConstructorAction(omitQuantityAddCustomId(ingredient))
        );
        dispatch(increaseIngredientAction(ingredient));
        return;
      }
    }

    dispatch(addMainToConstructorAction(omitQuantityAddCustomId(ingredient)));
    dispatch(increaseIngredientAction(ingredient));
  };

  const deleteIngredient = (ingredient: TIngredientInApp) => {
    dispatch(deleteMainFromConstructorAction(ingredient));
    dispatch(decreaseIngredientAction(ingredient));
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
            className={`${BurgerConstructorStyles.elements__mainIngredients} ${
              !constructorNotEmpty &&
              BurgerConstructorStyles.elements__mainIngredients_empty
            } custom-scroll`}
          >
            {mains.map((mainIngredient: TIngredientInApp, index: number) => (
              <MainConstructorElement
                index={index}
                key={`key_${index}`}
                element={mainIngredient}
                typeOfElement={undefined}
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
