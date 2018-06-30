import styles from '../../sass/fragments/top-panel.m-scss';

export const darkPanel = (el, {modifiers}) => {
  el.classList.add(styles['dark']);
  if (modifiers.overlay)
    el.classList.add(styles['overlay']);
};
