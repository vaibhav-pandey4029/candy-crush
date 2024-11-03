import { useState } from "react";
import Box from "../Box/Box"
import styles from './Container.module.css'
function Container() {
    const [startIdx,setStartIdx] = useState<number>();
    const handleDrop = (dropIdx:number)=>{
      console.log("dropping to ",dropIdx," from ",startIdx);
      if(startIdx===dropIdx+10||startIdx===dropIdx-10||startIdx===dropIdx-1||startIdx===dropIdx+1){
        console.log("valid move");
      }else{
        console.log("invalid move")
      }
    }
    const handleDrag = (idx:number)=>{
      setStartIdx(idx);
      console.log("drag start",idx);
    }
  return (
    <div className={styles.container}>
        {[...Array(100)].map((_,idx)=>{
        return <Box index={idx} onDrop={handleDrop} onDrag={handleDrag} key={idx}/>
      })}
    </div>
  )
}

export default Container