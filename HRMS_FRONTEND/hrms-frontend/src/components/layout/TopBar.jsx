import React from 'react';
import PropTypes from 'prop-types';
import { FiSearch, FiBell, FiMessageSquare, FiGrid } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import styles from './TopBar.module.css';

function TopBar({ portalLabel, searchPlaceholder }) {
  const { user } = useAuth();

  const initials = user
    ? (user.first_name?.[0] || '') + (user.last_name?.[0] || user.username?.[0] || '')
    : 'U';

  const displayName = user
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username
    : 'User';

  const roleLabel = user?.role_display || user?.role || '';

  return (
    <header className={styles.topbar}>
      {portalLabel && <span className={styles.portalLabel}>{portalLabel}</span>}

      <div className={styles.searchWrap}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="search"
          className={styles.searchInput}
          placeholder={searchPlaceholder || 'Search…'}
          aria-label="Search"
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <FiBell />
          <span className={styles.badge} aria-hidden="true" />
        </button>
        <button className={styles.iconBtn} aria-label="Messages">
          <FiMessageSquare />
        </button>
        <button className={styles.iconBtn} aria-label="Apps">
          <FiGrid />
        </button>

        <div className={styles.userInfo}>
          <div className={styles.userMeta}>
            <div className={styles.userName}>{displayName}</div>
            <div className={styles.userRole}>{roleLabel}</div>
          </div>
          <div className={styles.avatar}>{initials.toUpperCase()}</div>
        </div>
      </div>
    </header>
  );
}

TopBar.propTypes = {
  portalLabel: PropTypes.string,
  searchPlaceholder: PropTypes.string,
};

export default TopBar;
