import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';

export default function Header() {
  return (
    <nav className={styles.header}>
      <div className={styles.content}>
        <Link href="/">
          <Image src="/Logo.svg" height={25} width={240} alt="logo" />
        </Link>
      </div>
    </nav>
  );
}
