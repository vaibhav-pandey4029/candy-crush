import styles from "./Box.module.css";
import { IBoxProps } from "../../types/Box.types";
function Box({ index, onDrop, onDrag, color }: IBoxProps) {
  //By default, HTML elements don’t allow other elements to be dropped onto them. When dragging an item over another, the browser interprets it as hovering rather than preparing to drop.
  //Adding e.preventDefault() inside onDragOver tells the browser to treat the element as a valid drop target. Without this, the onDrop event won’t be triggered because the browser’s default behavior blocks the drop operation.

  return (
    <div
      className={styles.box}
      draggable
      onDragStart={() => onDrag(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(index)}
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default Box;
