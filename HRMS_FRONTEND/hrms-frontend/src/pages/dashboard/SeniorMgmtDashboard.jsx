import React, { useState } from 'react';
import { FiDownload, FiCalendar, FiCheck, FiX, FiEye, FiTrendingUp, FiTrendingDown, FiAlertCircle } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './SeniorMgmtDashboard.module.css';

const KPI = [
  { label: 'Total Workforce',       value: '4,821', sub: 'Across all regions',    trend: '+2.4%',  up: true,  icon: '👥' },
  { label: 'Budget Utilisation',    value: '87.5%', sub: 'UGX 1.05B of 1.2B',    trend: '-3.1%',  up: false, icon: '💰' },
  { label: 'Avg. Performance Index',value: '7.8',   sub: 'Out of 10 — Q3 2024',  trend: '+0.6',   up: true,  icon: '📈' },
  { label: 'Pending Approvals',     value: '23',    sub: '8 require urgent action', trend: null,    icon: '⏳' },
];

const MONTHS = ['OCT','NOV','DEC','JAN','FEB','MAR'];
const HEADCOUNT = [4700, 4720, 4760, 4790, 4810, 4821];
const TARGET    = [4800, 4800, 4800, 4850, 4900, 5000];

const APPROVALS = [
  { init: 'KM', name: 'Kato Michael',     dept: 'Engineering',   type: 'Budget Reallocation',   amount: 'UGX 45M',   status: 'urgent'   },
  { init: 'AN', name: 'Apio Nakato',      dept: 'HR Division',   type: 'New Position Creation',  amount: '3 Roles',   status: 'pending'  },
  { init: 'BW', name: 'Byarugaba Willy',  dept: 'Finance',       type: 'Overtime Policy Change', amount: 'Policy v3', status: 'review'   },
  { init: 'RC', name: 'Rwabogo Christine',dept: 'Operations',    type: 'Staff Transfer Batch',   amount: '14 Staff',  status: 'pending'  },
];

const STRATEGIC = [
  { label: 'Digital HR Transformation', progress: 68, status: 'On Track',  color: '#28a745' },
  { label: 'Staff Capacity Building',   progress: 45, status: 'At Risk',   color: '#ffc107' },
  { label: 'Regional Expansion Hiring', progress: 82, status: 'On Track',  color: '#28a745' },
  { label: 'NSSF Compliance Drive',     progress: 91, status: 'Complete',  color: '#005a9c' },
];

const RISKS = [
  { level: 'HIGH',   label: 'Key personnel turnover in Technical Ops', dept: 'Engineering',  icon: <FiTrendingDown /> },
  { level: 'MEDIUM', label: 'Payroll processing delays — Jinja Region', dept: 'Finance',     icon: <FiAlertCircle /> },
  { level: 'LOW',    label: 'Training budget underspend Q3',            dept: 'HR Division',  icon: <FiTrendingUp />  },
];

const RISK_COLORS = { HIGH: '#dc3545', MEDIUM: '#ffc107', LOW: '#28a745' };
const STATUS_COLORS = { urgent: '#dc3545', pending: '#856404', review: '#005a9c' };
const STATUS_LABELS = { urgent: 'URGENT', pending: 'PENDING', review: 'REVIEW' };

export default function SeniorMgmtDashboard() {
  const [activeApprovals, setActiveApprovals] = useState(APPROVALS);

  function handleApproval(idx, approved) {
    setActiveApprovals(prev => prev.filter((_, i) => i !== idx));
  }

  const maxH = Math.max(...HEADCOUNT);

  return (
    <DashboardLayout portalLabel="Executive Portal" searchPlaceholder="Search reports, staff, departments…">
      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={styles.overline}>SENIOR MANAGEMENT</p>
          <h1 className={styles.title}>Executive Overview Dashboard</h1>
          <p className={styles.sub}>FY 2023/24 Q3 — Organisational Performance &amp; Strategic Alignment</p>
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.btnOutline}><FiDownload /> Export Report</button>
          <button className={styles.btnPrimary}><FiCalendar /> Q3 2024</button>
        </div>
      </div>

      {/* KPI row */}
      <div className={styles.kpiRow}>
        {KPI.map((k, i) => (
          <div key={i} className={`${styles.kpiCard} ${k.sub.includes('urgent') ? styles.kpiAlert : ''}`}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiIcon}>{k.icon}</span>
              {k.trend && (
                <span className={`${styles.kpiTrend} ${k.up ? styles.up : styles.down}`}>
                  {k.up ? <FiTrendingUp size={12}/> : <FiTrendingDown size={12}/>} {k.trend}
                </span>
              )}
            </div>
            <div className={styles.kpiVal}>{k.value}</div>
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiSub}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className={styles.twoCol}>
        {/* Headcount Trend Chart */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>Workforce Headcount Trend</span>
            <div className={styles.legend}>
              <span><span className={styles.dot} style={{background:'#00244d'}}/>Actual</span>
              <span><span className={styles.dot} style={{background:'#c8dcf0'}}/>Target</span>
            </div>
          </div>
          <div className={styles.barGroup}>
            {MONTHS.map((m, i) => (
              <div key={m} className={styles.barPair}>
                <div className={styles.bars}>
                  <div className={styles.barActual} style={{height:`${(HEADCOUNT[i]/maxH)*100}px`}} title={`Actual: ${HEADCOUNT[i].toLocaleString()}`}/>
                  <div className={styles.barTarget} style={{height:`${(TARGET[i]/maxH)*100}px`}}   title={`Target: ${TARGET[i].toLocaleString()}`}/>
                </div>
                <div className={styles.barLabel}>{m}</div>
              </div>
            ))}
          </div>
          <div className={styles.chartFooter}>
            <div><span className={styles.footLabel}>CURRENT</span><br/><strong>4,821</strong></div>
            <div><span className={styles.footLabel}>YEAR TARGET</span><br/><strong>5,000</strong></div>
            <div><span className={styles.footLabel}>GAP</span><br/><strong className={styles.gap}>179</strong></div>
          </div>
        </div>

        {/* Strategic Initiatives */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><span>Strategic Initiatives</span><span className={styles.q}>Q3 Progress</span></div>
          {STRATEGIC.map((s, i) => (
            <div key={i} className={styles.initItem}>
              <div className={styles.initTop}>
                <span className={styles.initLabel}>{s.label}</span>
                <span className={styles.initStatus} style={{color: s.color}}>{s.status}</span>
              </div>
              <div className={styles.initBar}>
                <div className={styles.initFill} style={{width:`${s.progress}%`, background: s.color}}/>
              </div>
              <div className={styles.initPct}>{s.progress}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.twoCol} style={{marginTop:'var(--space-md)'}}>
        {/* Pending Approvals */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>⏳ Pending Approvals</span>
            <span className={styles.countBadge}>{activeApprovals.length} Items</span>
          </div>
          {activeApprovals.length === 0 ? (
            <div className={styles.emptyState}>✅ All approvals are up to date.</div>
          ) : (
            <table className={styles.table}>
              <thead><tr><th>Requestor</th><th>Type</th><th>Detail</th><th>Priority</th><th>Actions</th></tr></thead>
              <tbody>
                {activeApprovals.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <div className={styles.empCell}>
                        <div className={styles.ava}>{a.init}</div>
                        <div><div className={styles.empName}>{a.name}</div><div className={styles.empDept}>{a.dept}</div></div>
                      </div>
                    </td>
                    <td className={styles.typeCell}>{a.type}</td>
                    <td><strong>{a.amount}</strong></td>
                    <td><span className={styles.sBadge} style={{background: RISK_COLORS[a.status === 'urgent' ? 'HIGH' : a.status === 'pending' ? 'MEDIUM' : 'LOW']+'22', color: STATUS_COLORS[a.status]}}>{STATUS_LABELS[a.status]}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.approveBtn} onClick={() => handleApproval(i, true)}  title="Approve"><FiCheck size={12}/></button>
                        <button className={styles.rejectBtn}  onClick={() => handleApproval(i, false)} title="Reject"><FiX size={12}/></button>
                        <button className={styles.viewBtn}    title="View details"><FiEye size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Risk Register */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><span>⚠️ Risk Register</span><span className={styles.q}>Active Flags</span></div>
          {RISKS.map((r, i) => (
            <div key={i} className={styles.riskItem}>
              <div className={styles.riskLevel} style={{background: RISK_COLORS[r.level]+'22', color: RISK_COLORS[r.level]}}>{r.level}</div>
              <div className={styles.riskBody}>
                <div className={styles.riskLabel}>{r.label}</div>
                <div className={styles.riskDept}>{r.dept}</div>
              </div>
              <span className={styles.riskIcon} style={{color: RISK_COLORS[r.level]}}>{r.icon}</span>
            </div>
          ))}

          {/* Dept performance mini-summary */}
          <div className={styles.deptSummary}>
            <div className={styles.cardHeader} style={{marginTop:'var(--space-md)'}}><span>Dept. Performance Snapshot</span></div>
            {[['Water Engineering','94%','#28a745'],['Network Maintenance','82%','#ffc107'],['Customer Services','89%','#005a9c']].map(([d,v,c]) => (
              <div key={d} className={styles.deptRow}>
                <span className={styles.deptName}>{d}</span>
                <div className={styles.deptBar}><div style={{width:v, height:'100%', background:c, borderRadius:'3px'}}/></div>
                <strong className={styles.deptVal} style={{color:c}}>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
