import React, { FC, ReactNode } from "react";

import styles from "./MainLayout.module.scss";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = (props: Props) => {
  return (
    <main id={styles.main}>
      <div className={styles.container}>{props.children}</div>
    </main>
  );
};

export default MainLayout;
