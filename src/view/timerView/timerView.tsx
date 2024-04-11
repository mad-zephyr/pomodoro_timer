'use client'

import { FC } from 'react'

import { TimerSettings } from '@/modules'
import { ModalWrapper, Tabs } from '@/components'
import SettingsBtn from '@/components/icon/setting.svg'
import { useAppStore } from '@/context/app.context'
import { TimerWrapper } from '@/modules/timer/components/timer-wrapper/timer-wrapper'

import styles from './styles.module.sass'

const TimerView: FC = () => {
  const showSettings = useAppStore((state) => state.showSettings)
  const { setShowSettings } = useAppStore.getState()

  const handleClose = () => setShowSettings(false)
  const handleOpen = () => setShowSettings(true)

  return (
    <div className={styles.main}>
      <div className={styles.header}>pomodoro</div>
      <Tabs className={styles.tabs} />
      <TimerWrapper />
      <SettingsBtn onClick={handleOpen} style={{ cursor: 'pointer' }} />
      <ModalWrapper wrapperId="modal" isShow={showSettings}>
        <TimerSettings onCLose={handleClose} />
      </ModalWrapper>
    </div>
  )
}

export default TimerView
