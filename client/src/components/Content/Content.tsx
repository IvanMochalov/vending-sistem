import React from 'react';
import styles from './content.module.css'

type TContentPropr = {
  children: React.ReactNode;
}

export const Content = ({ children }: TContentPropr) => {
  return (
    <main className={styles.main}>
      { children }
    </main>
  )
}
