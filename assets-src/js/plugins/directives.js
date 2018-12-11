import styles from "../../sass/fragments/top-panel.m-scss";

export const DarkPanel = (el, { modifiers }) => {
  el.classList.add(styles["dark"]);
  if (modifiers.overlay) el.classList.add(styles["overlay"]);
};
