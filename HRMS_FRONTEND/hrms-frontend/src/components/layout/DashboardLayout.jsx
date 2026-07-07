import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import styles from './DashboardLayout.module.css';

function DashboardLayout({ children, portalLabel, searchPlaceholder }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <TopBar portalLabel={portalLabel} searchPlaceholder={searchPlaceholder} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  portalLabel: PropTypes.string,
  searchPlaceholder: PropTypes.string,
};

export default DashboardLayout;
