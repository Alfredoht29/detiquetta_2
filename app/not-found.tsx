'use client';
import React, { useEffect } from 'react';
import { useNavbar } from "../app/stores/navBarStore";
import Link from 'next/link';
import styles from './styles/not-found.module.css';

const NotFound: React.FC = () => {
  const { setShowNavbar } = useNavbar();

  useEffect(() => {
    setShowNavbar(false); 
    return () => setShowNavbar(true);
  }, [setShowNavbar]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heroText}>404</h1>
      <p className={styles.subText}>Page Not Found</p>
      <Link href="/" className={styles.homeLink}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
