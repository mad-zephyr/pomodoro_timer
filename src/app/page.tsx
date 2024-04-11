import TimerView from '@/view/timerView/timerView'

import styles from './page.module.sass'

export default function Home() {
  return (
    <main className={styles.main}>
      <TimerView />
    </main>
  )
}
