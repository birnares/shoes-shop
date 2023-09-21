import { React } from "react";
import styles from "./Billboard.module.scss";

const Slider = () => {
  return (
    <>
      <div className={styles.billboard}>
        <img
          className={styles.logo}
          src="img/slider/logo-slider.png"
          alt="BillboardLogo"
        />
        <div className={styles.info}>
          <div>
            <h1 className={styles.titleUp}>Stan Smith,</h1>
            <h1 className={styles.titleDown}>Forever!</h1>
            <button className={styles.btn}>Купить</button>
          </div>
          <div className={styles.frog}>
            <img src="img/slider/frog.png" alt="FrogBillboard" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
