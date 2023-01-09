import { Link } from "react-router-dom";

export const LentaPage = () => {
  return (
    <div>
      <h2 className="text ">Лента заказов</h2>
      <Link className="text text_type_main-default" to="/">
        Вернуться на главную
      </Link>
    </div>
  );
};
