import { useEffect, useState } from "react";
import Box from "../Box/Box";
import styles from "./Container.module.css";
import { colors } from "../../utils/constants";
import { ColorStack } from "../../utils/ColorStack";

interface RandomColors {
  [key: number]: string;
}

interface BurstCandy {
  [key: number]: number;
}

function Container() {
  const [startIdx, setStartIdx] = useState<number>();
  const [indexColor, setIndexColor] = useState<RandomColors>({});
  const [stack,setStack] = useState<ColorStack<string>>(new ColorStack<string>());
  const handleDrop = (dropIdx: number) => {
    if (
      startIdx === dropIdx + 10 ||
      startIdx === dropIdx - 10 ||
      startIdx === dropIdx - 1 ||
      startIdx === dropIdx + 1
    ) {
      const startColor = indexColor[startIdx];
      const updatedColors = {
        ...indexColor,
        [startIdx]: indexColor[dropIdx],
        [dropIdx]: startColor,
      };
      setIndexColor(updatedColors);
      crushCandy(updatedColors);
    } else {
      console.log("invalid move");
    }
  };

  let toBeBursted = false;
  const crushCandy = (colorsToCheck: RandomColors) => {
    if (Object.prototype.hasOwnProperty.call(colorsToCheck, 99)) {
      const candyBurst: BurstCandy = {};
      candyBurst[0] = 0;
      for (let i = 1; i < 100; i++) {
        candyBurst[i] = 0;
        if (
          i - 1 >= 0 &&
          colorsToCheck[i - 1] === colorsToCheck[i] &&
          candyBurst[i - 1] === 1
        ) {
          toBeBursted = true;
          candyBurst[i] = 1;
        } else if (
          i - 2 >= 0 &&
          colorsToCheck[i - 1] === colorsToCheck[i] &&
          colorsToCheck[i - 2] === colorsToCheck[i]
        ) {
          toBeBursted = true;
          candyBurst[i] = 1;
          candyBurst[i - 1] = 1;
          candyBurst[i - 2] = 1;
        }
        if (
          i - 10 >= 0 &&
          colorsToCheck[i - 10] === colorsToCheck[i] &&
          candyBurst[i - 10] === 2
        ) {
          toBeBursted = true;
          candyBurst[i] = 2;
        } else if (
          i - 20 >= 0 &&
          colorsToCheck[i - 10] === colorsToCheck[i] &&
          colorsToCheck[i - 20] === colorsToCheck[i]
        ) {
          toBeBursted = true;
          candyBurst[i] = 2;
          candyBurst[i - 10] = 2;
          candyBurst[i - 20] = 2;
        }
      }
      if (toBeBursted) {
        const updatedColors:RandomColors = {};
        for(let columnNumber=0;columnNumber<=9;columnNumber++){
          setStack(new ColorStack<string>());
          let numberOfColorToBeGenerated = 0;
          for(let cellNumber = columnNumber;cellNumber<100;cellNumber+=10){
            if(candyBurst[cellNumber]===0){
              stack.push(indexColor[cellNumber]);
            }else{
              numberOfColorToBeGenerated++
            }
          }
          while(numberOfColorToBeGenerated>=0){
            stack.push(indexColor[Math.floor(Math.random()*colors.length)]);
            numberOfColorToBeGenerated--;
          }
          for(let cellNumber = columnNumber;cellNumber<100;cellNumber+=10){
            const valueToPush = stack.pop();
            if(valueToPush)
            updatedColors[cellNumber]=valueToPush;
          }
        }
        console.log("updated color ",updatedColors)
        // setIndexColor(updatedColors)
        setIndexColor((prevColors) => {
          const updatedColors = { ...prevColors };
          for (const key in candyBurst) {
            if (candyBurst[key] !== 0) {
              updatedColors[Number(key)] =
                colors[Math.floor(Math.random() * colors.length)];
            }
          }
          return updatedColors;
        });
      }
    }
  };
  useEffect(() => {
    const numbers: RandomColors = {};
    for (let i = 0; i < 100; i++) {
      numbers[i] = colors[Math.floor(Math.random() * 5)];
    }
    setIndexColor(numbers);
  }, []);
  useEffect(()=>{
    crushCandy(indexColor)
  },[indexColor])
  const handleDrag = (idx: number) => {
    setStartIdx(idx);
  };
  return (
    <div className={styles.container}>
      {[...Array(100)].map((_, idx) => {
        return (
          <Box
            index={idx}
            onDrop={handleDrop}
            onDrag={handleDrag}
            key={idx}
            color={indexColor[idx]}
          />
        );
      })}
    </div>
  );
}

export default Container;
