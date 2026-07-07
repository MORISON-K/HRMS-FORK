import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EmployeePicker.module.css';

/**
 * Type-to-filter employee select. `options` is [{ id, label }], `value` is the
 * selected employee id, `onChange(id)` fires when an option is picked.
 */
function EmployeePicker({ options, value, onChange, placeholder }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => String(o.id) === String(value));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <div className={styles.wrap}>
      <input
        className={styles.input}
        value={open ? query : (selected?.label || '')}
        placeholder={placeholder || 'Search employee…'}
        onFocus={() => { setOpen(true); setQuery(''); }}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && (
        <div className={styles.dropdown}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>No employees found.</div>
          ) : (
            filtered.slice(0, 50).map((o) => (
              <div
                key={o.id}
                className={styles.option}
                onMouseDown={() => { onChange(o.id); setOpen(false); }}
              >
                {o.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

EmployeePicker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default EmployeePicker;
