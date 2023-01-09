import { Link } from "react-router-dom";

import NotFound404Styles from "./NotFound404Styles.module.css";

export const NotFound404Page = () => {
  return (
    <div className={NotFound404Styles.container}>
      <h2 className={`${NotFound404Styles.title} text text_type_digits-large`}>
        404
      </h2>
      <div className="mt-20">
        <div className={NotFound404Styles.help__container}>
          <p className="text text_type_main-default text_color_inactive">
            Ошиблись адресом?
          </p>
          <Link
            className={`${NotFound404Styles.link} text text_type_main-default`}
            to="/"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};
