import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatCard.module.css';

function StatCard({ label, value, sub, icon, trend, trendUp, accent, small }) {
  return (
    <div className={`${styles.card} ${small ? styles.small : ''}`} style={accent ? { borderTop: `3px solid ${accent}` } : {}}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.value}>{value}</div>
      {sub && <div className={styles.sub}>{sub}</div>}
      {trend && (
        <div className={`${styles.trend} ${trendUp ? styles.up : styles.down}`}>
          {trendUp ? '▲' : '▼'} {trend}
        </div>
      )}
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sub: PropTypes.string,
  icon: PropTypes.node,
  trend: PropTypes.string,
  trendUp: PropTypes.bool,
  accent: PropTypes.string,
  small: PropTypes.bool,
};

export default StatCard;
