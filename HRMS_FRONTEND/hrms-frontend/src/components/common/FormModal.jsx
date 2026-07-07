import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormModal.module.css';

/**
 * Generic modal shell: overlay + header + footer (Cancel/Submit).
 * Module-specific form fields are passed in as children, wrapped in a <form>.
 */
function FormModal({ title, onClose, onSubmit, submitting, submitLabel, error, children }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>{title}</div>
        <form onSubmit={onSubmit}>
          {error && <div className={styles.errorBanner}>{error}</div>}
          {children}
          <div className={styles.footer}>
            <button type="button" className={styles.btnOutline} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.btnPrimary} disabled={submitting}>
              {submitting ? 'Saving…' : (submitLabel || 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

FormModal.propTypes = {
  title: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  submitLabel: PropTypes.string,
  error: PropTypes.node,
  children: PropTypes.node,
};

export default FormModal;
