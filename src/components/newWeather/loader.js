import styles from './loader.module.css'

export default function Loader() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}>
        <div></div>
      </div>
    </div>
  )
}