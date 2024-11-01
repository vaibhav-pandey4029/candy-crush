import Box from "../Box/Box"
import styles from './Container.module.css'
function Container() {
  return (
    <div className={styles.container}>
        {[...Array(100)].map((item,idx)=>{
        return <Box />
      })}
    </div>
  )
}

export default Container