import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import styles from './styles.module.sass'

type TModal = {
  wrapperId: string
  isShow: boolean
  children: string | JSX.Element | JSX.Element[]
}

export const ModalWrapper: FC<TModal> = ({ children, wrapperId, isShow }) => {
  const [wrapperElement, setWrapperElement] = useState<Element>()

  const showModal = isShow && wrapperElement

  useEffect(() => {
    let modalRoot = document.getElementById(wrapperId)

    if (!modalRoot) {
      setWrapperElement(createWrapperAndAppendToBody(wrapperId))
    } else {
      setWrapperElement(modalRoot)
    }

    return () => modalRoot?.remove()
  }, [wrapperId])

  return (
    showModal &&
    createPortal(<div className={styles.modal}>{children}</div>, wrapperElement)
  )
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const div = document.createElement('div')
  div.setAttribute('id', wrapperId)
  div.setAttribute('className', styles.modal)
  const body = document.querySelector('body')
  body?.insertAdjacentElement('beforeend', div)
  return div
}
