import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import FormModal from '../../components/common/FormModal';
import StatusBadge from '../../components/common/StatusBadge';
import { useApiResource } from '../../hooks/useApiResource';
import { useAuth } from '../../context/AuthContext';
import { leaveTypesService, leaveBalancesService, leaveRequestsService } from '../../services/leaveService';
import { IS_HR_OR_ADMIN, IS_DEPARTMENT_HEAD_OR_ABOVE } from '../../utils/constants';
import styles from './LeaveList.module.css';

/* ---------- Leave Types tab ---------- */

function LeaveTypeFormModal({ editing, onClose, onSaved }) {
  const [form, setForm] = useState(editing || {
    name: '', days_allowed: 0, is_paid: true, requires_approval: true,
    carry_forward: false, max_carry_days: 0, description: '',
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function setField(key, value) { setForm((f) => ({ ...f, [key]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (editing) await leaveTypesService.update(editing.id, form);
      else await leaveTypesService.create(form);
      onSaved();
    } catch (err) {
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Save failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormModal title={editing ? `Edit ${editing.name}` : 'New Leave Type'} onClose={onClose} onSubmit={handleSubmit} submitting={submitting} error={error}>
      <div className={styles.field}><label>Name</label><input value={form.name} onChange={(e) => setField('name', e.target.value)} required /></div>
      <div className={styles.row2}>
        <div className={styles.field}><label>Days Allowed</label><input type="number" value={form.days_allowed} onChange={(e) => setField('days_allowed', e.target.value)} required /></div>
        <div className={styles.field}><label>Max Carry Days</label><input type="number" value={form.max_carry_days} onChange={(e) => setField('max_carry_days', e.target.value)} /></div>
      </div>
      <label className={styles.checkboxField}><input type="checkbox" checked={form.is_paid} onChange={(e) => setField('is_paid', e.target.checked)} /> Paid Leave</label>
      <label className={styles.checkboxField}><input type="checkbox" checked={form.requires_approval} onChange={(e) => setField('requires_approval', e.target.checked)} /> Requires Approval</label>
      <label className={styles.checkboxField}><input type="checkbox" checked={form.carry_forward} onChange={(e) => setField('carry_forward', e.target.checked)} /> Allow Carry Forward</label>
      <div className={styles.field}><label>Description</label><textarea rows={2} value={form.description} onChange={(e) => setField('description', e.target.value)} /></div>
    </FormModal>
  );
}

function LeaveTypesTab({ canWrite }) {
  const { data, loading, error, refetch } = useApiResource(leaveTypesService);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function openCreate() { setEditing(null); setModalOpen(true); }
  function openEdit(row) { setEditing(row); setModalOpen(true); }
  function handleSaved() { setModalOpen(false); refetch(); }
  async function handleDelete(row) {
    if (!window.confirm(`Delete leave type "${row.name}"?`)) return;
    await leaveTypesService.remove(row.id);
    refetch();
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'days_allowed', label: 'Days Allowed' },
    { key: 'is_paid', label: 'Paid', render: (r) => (r.is_paid ? 'Yes' : 'No') },
    { key: 'requires_approval', label: 'Needs Approval', render: (r) => (r.requires_approval ? 'Yes' : 'No') },
    { key: 'carry_forward', label: 'Carry Forward', render: (r) => (r.carry_forward ? 'Yes' : 'No') },
  ];

  return (
    <div className={styles.card}>
      {error && <div className={styles.errorBanner}>{error}</div>}
      {canWrite && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-md)' }}>
          <button className={styles.btnPrimary} onClick={openCreate}><FiPlus /> New Leave Type</button>
        </div>
      )}
      <DataTable
        columns={columns}
        rows={data}
        loading={loading}
        actions={canWrite ? (row) => (
          <>
            <button className={styles.iconBtn} onClick={() => openEdit(row)}><FiEdit2 /></button>
            <button className={`${styles.iconBtn} ${styles.dangerBtn}`} onClick={() => handleDelete(row)}><FiTrash2 /></button>
          </>
        ) : undefined}
      />
      {modalOpen && <LeaveTypeFormModal editing={editing} onClose={() => setModalOpen(false)} onSaved={handleSaved} />}
    </div>
  );
}

/* ---------- Balances tab (read-only) ---------- */

function BalancesTab() {
  const { data, loading, error } = useApiResource(leaveBalancesService);
  const columns = [
    { key: 'employee', label: 'Employee ID' },
    { key: 'leave_type_name', label: 'Leave Type' },
    { key: 'year', label: 'Year' },
    { key: 'total_days', label: 'Total Days' },
    { key: 'used_days', label: 'Used Days' },
    { key: 'remaining_days', label: 'Remaining' },
  ];
  return (
    <div className={styles.card}>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <DataTable columns={columns} rows={data} loading={loading} emptyMessage="No leave balances found." />
    </div>
  );
}

/* ---------- Requests tab ---------- */

function RequestFormModal({ leaveTypes, onClose, onSaved }) {
  const [form, setForm] = useState({ leave_type: '', start_date: '', end_date: '', days_requested: 1, reason: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function setField(key, value) { setForm((f) => ({ ...f, [key]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await leaveRequestsService.create(form);
      onSaved();
    } catch (err) {
      const data = err.response?.data;
      setError(data ? JSON.stringify(data) : 'Request failed. You may need an employee record before you can request leave.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormModal title="Request Leave" onClose={onClose} onSubmit={handleSubmit} submitting={submitting} error={error}>
      <div className={styles.field}>
        <label>Leave Type</label>
        <select value={form.leave_type} onChange={(e) => setField('leave_type', e.target.value)} required>
          <option value="">—</option>
          {leaveTypes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div className={styles.row2}>
        <div className={styles.field}><label>Start Date</label><input type="date" value={form.start_date} onChange={(e) => setField('start_date', e.target.value)} required /></div>
        <div className={styles.field}><label>End Date</label><input type="date" value={form.end_date} onChange={(e) => setField('end_date', e.target.value)} required /></div>
      </div>
      <div className={styles.field}><label>Days Requested</label><input type="number" value={form.days_requested} onChange={(e) => setField('days_requested', e.target.value)} required /></div>
      <div className={styles.field}><label>Reason</label><textarea rows={3} value={form.reason} onChange={(e) => setField('reason', e.target.value)} required /></div>
    </FormModal>
  );
}

function RequestsTab({ canApprove }) {
  const { data, loading, error, refetch } = useApiResource(leaveRequestsService);
  const leaveTypesRes = useApiResource(leaveTypesService);
  const [modalOpen, setModalOpen] = useState(false);

  function handleSaved() { setModalOpen(false); refetch(); }
  async function handleDecision(row, decision) {
    await leaveRequestsService.approve(row.id, { decision });
    refetch();
  }
  async function handleDelete(row) {
    if (!window.confirm('Withdraw this leave request?')) return;
    await leaveRequestsService.remove(row.id);
    refetch();
  }

  const columns = [
    { key: 'employee_name', label: 'Employee' },
    { key: 'leave_type_name', label: 'Type' },
    { key: 'start_date', label: 'Start' },
    { key: 'end_date', label: 'End' },
    { key: 'days_requested', label: 'Days' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className={styles.card}>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-md)' }}>
        <button className={styles.btnPrimary} onClick={() => setModalOpen(true)}><FiPlus /> Request Leave</button>
      </div>
      <DataTable
        columns={columns}
        rows={data}
        loading={loading}
        actions={(row) => (
          <>
            {canApprove && row.status === 'pending' && (
              <>
                <button className={`${styles.iconBtn} ${styles.successBtn}`} onClick={() => handleDecision(row, 'approved')} title="Approve"><FiCheck /></button>
                <button className={`${styles.iconBtn} ${styles.dangerBtn}`} onClick={() => handleDecision(row, 'rejected')} title="Reject"><FiX /></button>
              </>
            )}
            {row.status === 'pending' && (
              <button className={`${styles.iconBtn} ${styles.dangerBtn}`} onClick={() => handleDelete(row)} title="Withdraw"><FiTrash2 /></button>
            )}
          </>
        )}
      />
      {modalOpen && <RequestFormModal leaveTypes={leaveTypesRes.data} onClose={() => setModalOpen(false)} onSaved={handleSaved} />}
    </div>
  );
}

/* ---------- Page shell ---------- */

export default function LeaveList() {
  const { user } = useAuth();
  const [tab, setTab] = useState('requests');
  const canWriteTypes = IS_HR_OR_ADMIN.includes(user?.role);
  const canApprove = IS_DEPARTMENT_HEAD_OR_ABOVE.includes(user?.role);

  return (
    <DashboardLayout portalLabel="Leave Management" searchPlaceholder="Search leave requests…">
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Leave Management</h1>
          <p className={styles.sub}>Leave types, balances and requests.</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'requests' ? styles.tabActive : ''}`} onClick={() => setTab('requests')}>Requests</button>
        <button className={`${styles.tab} ${tab === 'balances' ? styles.tabActive : ''}`} onClick={() => setTab('balances')}>Balances</button>
        <button className={`${styles.tab} ${tab === 'types' ? styles.tabActive : ''}`} onClick={() => setTab('types')}>Leave Types</button>
      </div>

      {tab === 'requests' && <RequestsTab canApprove={canApprove} />}
      {tab === 'balances' && <BalancesTab />}
      {tab === 'types' && <LeaveTypesTab canWrite={canWriteTypes} />}
    </DashboardLayout>
  );
}
