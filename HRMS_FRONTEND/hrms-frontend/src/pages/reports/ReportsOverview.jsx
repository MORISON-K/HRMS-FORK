import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { reportsService } from '../../services/reportsService';
import { IS_HR_OR_ADMIN, IS_MANAGEMENT } from '../../utils/constants';
import styles from './ReportsOverview.module.css';

function BarChart({ data, labelKey, countKey }) {
  const max = Math.max(1, ...data.map((d) => d[countKey] || 0));
  return (
    <div className={styles.barChart}>
      {data.map((d, i) => (
        <div className={styles.barItem} key={i}>
          <div className={styles.barCount}>{d[countKey] || 0}</div>
          <div className={styles.barFill} style={{ height: `${((d[countKey] || 0) / max) * 90 + 10}px` }} />
          <div className={styles.barLabel}>{d[labelKey] || '—'}</div>
        </div>
      ))}
    </div>
  );
}

function HeadcountCard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    reportsService.getHeadcount().then(setData).catch(() => setError('Failed to load headcount summary.'));
  }, []);

  if (error) return <div className={styles.card}><div className={styles.errorBanner}>{error}</div></div>;
  if (!data) return <div className={styles.card}>Loading…</div>;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>Headcount Summary</div>
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Active Staff</div>
          <div className={styles.kpiVal}>{data.total}</div>
        </div>
      </div>
      <div className={styles.cardHeader}>By Department</div>
      <BarChart data={data.by_dept} labelKey="name" countKey="active" />
      <div className={styles.cardHeader} style={{ marginTop: 'var(--space-md)' }}>By Gender</div>
      <div className={styles.pillRow}>
        {data.by_gender.map((g, i) => <span key={i} className={styles.pill}>{g.gender}: {g.count}</span>)}
      </div>
      <div className={styles.cardHeader} style={{ marginTop: 'var(--space-md)' }}>By Contract Type</div>
      <div className={styles.pillRow}>
        {data.by_contract.map((c, i) => <span key={i} className={styles.pill}>{c.contract_type}: {c.count}</span>)}
      </div>
    </div>
  );
}

function LeaveSummaryCard() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    reportsService.getLeave(year).then(setData).catch(() => setError('Failed to load leave summary.'));
  }, [year]);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        Leave Summary
        <select className={styles.yearSelect} value={year} onChange={(e) => setYear(e.target.value)}>
          {[year - 1, year, year + 1].map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      {error && <div className={styles.errorBanner}>{error}</div>}
      {data && (
        <>
          <div className={styles.kpiRow}>
            <div className={styles.kpiCard}>
              <div className={styles.kpiLabel}>Total Requests</div>
              <div className={styles.kpiVal}>{data.total}</div>
            </div>
          </div>
          <div className={styles.cardHeader}>By Status</div>
          <BarChart data={data.by_status} labelKey="status" countKey="count" />
          <div className={styles.cardHeader} style={{ marginTop: 'var(--space-md)' }}>By Type</div>
          <div className={styles.pillRow}>
            {data.by_type.map((t, i) => <span key={i} className={styles.pill}>{t.leave_type__name || '—'}: {t.count}</span>)}
          </div>
        </>
      )}
    </div>
  );
}

function RecruitmentSummaryCard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    reportsService.getRecruitment().then(setData).catch(() => setError('Failed to load recruitment summary.'));
  }, []);

  if (error) return <div className={styles.card}><div className={styles.errorBanner}>{error}</div></div>;
  if (!data) return <div className={styles.card}>Loading…</div>;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>Recruitment Summary</div>
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}><div className={styles.kpiLabel}>Total Jobs</div><div className={styles.kpiVal}>{data.total_jobs}</div></div>
        <div className={styles.kpiCard}><div className={styles.kpiLabel}>Open Jobs</div><div className={styles.kpiVal}>{data.open_jobs}</div></div>
        <div className={styles.kpiCard}><div className={styles.kpiLabel}>Applications</div><div className={styles.kpiVal}>{data.total_applications}</div></div>
        <div className={styles.kpiCard}><div className={styles.kpiLabel}>Hired</div><div className={styles.kpiVal}>{data.hired}</div></div>
      </div>
      <div className={styles.cardHeader}>By Job Type</div>
      <BarChart data={data.by_job_type} labelKey="job_type" countKey="count" />
    </div>
  );
}

export default function ReportsOverview() {
  const { user } = useAuth();
  const canViewHeadcount = IS_MANAGEMENT.includes(user?.role);
  const canViewOther = IS_HR_OR_ADMIN.includes(user?.role);

  if (!canViewHeadcount && !canViewOther) {
    return (
      <DashboardLayout portalLabel="Reports" searchPlaceholder="Search reports…">
        <h1 className={styles.title}>Reports</h1>
        <div className={styles.card}>You don&apos;t have access to view HR reports.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout portalLabel="Reports" searchPlaceholder="Search reports…">
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Reports</h1>
          <p className={styles.sub}>Organization-wide headcount, leave and recruitment analytics.</p>
        </div>
      </div>

      {canViewHeadcount && <HeadcountCard />}
      {canViewOther && <LeaveSummaryCard />}
      {canViewOther && <RecruitmentSummaryCard />}
    </DashboardLayout>
  );
}
