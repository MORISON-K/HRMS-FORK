import React from 'react';
import { FiDownload, FiCalendar, FiMaximize2 } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './BoardDashboard.module.css';

const KPI = [
  { label: 'Total Workforce Cost',   value: 'UGX 1.05B', sub: '87.5% of annual budget',  tag: 'WITHIN TARGET', tagOk: true  },
  { label: 'Workforce Headcount',    value: '4,821',      sub: 'Target: 5,000 by Dec 2024', tag: '+2.4% QoQ',   tagOk: true  },
  { label: 'Compliance Score',       value: '96.2%',      sub: 'Audit Q3 — All regions',   tag: 'EXCELLENT',    tagOk: true  },
  { label: 'Staff Turnover Rate',    value: '4.2%',       sub: 'Industry avg: 6.5%',        tag: 'LOW RISK',     tagOk: true  },
  { label: 'Open Vacancies',         value: '38',         sub: '12 critical roles',          tag: 'ACTION NEEDED', tagOk: false },
  { label: 'Grievances Filed (Q3)',  value: '7',          sub: '5 resolved, 2 pending',      tag: 'MONITORED',    tagOk: true  },
];

const RESOLUTIONS = [
  { ref:'BOD-R-001', title:'Approval of FY 2024/25 HR Budget',        date:'Aug 12, 2024', status:'passed'  },
  { ref:'BOD-R-002', title:'Ratification of New Grading Structure',    date:'Jul 28, 2024', status:'passed'  },
  { ref:'BOD-R-003', title:'Executive Performance Bonus Framework',    date:'Sep 03, 2024', status:'deferred'},
  { ref:'BOD-R-004', title:'Regional Recruitment Drive — East Africa', date:'Sep 03, 2024', status:'passed'  },
];

const MEETINGS = [
  { date:'15 OCT', title:'Q3 Performance Review',       type:'Full Board Meeting',       venue:'Boardroom 1, Head Office' },
  { date:'22 OCT', title:'HR Budget Reconciliation',    type:'Finance Sub-Committee',    venue:'Virtual — MS Teams'        },
  { date:'05 NOV', title:'Annual Strategy Review',      type:'Strategy Committee',       venue:'Serena Hotel, Kampala'      },
];

const QUARTERS = ['Q1','Q2','Q3'];
const BUDGET_B  = [88, 90, 87.5];
const HEADCOUNT_B = [4680, 4750, 4821];
const maxH = Math.max(...HEADCOUNT_B);

const EXEC = [
  { init:'RN', name:'Ruth Nankabirwa',  role:'Managing Director',      kpi:'9.1/10', variance:'+0.3' },
  { init:'SM', name:'Samuel Mutebi',    role:'Dir. Finance & Strategy', kpi:'8.7/10', variance:'+0.1' },
  { init:'JK', name:'Joyce Kyomugisha', role:'Dir. Human Resources',   kpi:'8.4/10', variance:'-0.2' },
  { init:'PO', name:'Patrick Ochen',    role:'Dir. Operations',         kpi:'7.9/10', variance:'+0.5' },
];

const STATUS_STYLES = {
  passed:   { bg:'#e6f4ea', color:'#28a745', label:'PASSED'   },
  deferred: { bg:'#fff3cd', color:'#856404', label:'DEFERRED' },
  pending:  { bg:'#fdecea', color:'#dc3545', label:'PENDING'  },
};

export default function BoardDashboard() {
  return (
    <DashboardLayout portalLabel="Board Secretariat" searchPlaceholder="Search resolutions, reports, metrics…">
      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={styles.overline}>BOARD OF DIRECTORS — NWSC UGANDA</p>
          <h1 className={styles.title}>Governance &amp; Performance Dashboard</h1>
          <p className={styles.sub}>FY 2023/24 Q3 Executive Summary — Confidential</p>
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.btnOutline}><FiDownload /> Board Pack</button>
          <button className={styles.btnPrimary}><FiCalendar /> Q3 2024</button>
        </div>
      </div>

      {/* KPI grid — 3 × 2 */}
      <div className={styles.kpiGrid}>
        {KPI.map((k, i) => (
          <div key={i} className={styles.kpiCard}>
            <div className={styles.kpiVal}>{k.value}</div>
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiSub}>{k.sub}</div>
            <span className={`${styles.kpiTag} ${k.tagOk ? styles.tagOk : styles.tagAlert}`}>{k.tag}</span>
          </div>
        ))}
      </div>

      <div className={styles.threeCol}>
        {/* Quarterly Trend — Budget vs Headcount */}
        <div className={styles.card} style={{gridColumn:'span 2'}}>
          <div className={styles.cardHeader}>
            <span>Quarterly Performance Trend</span>
            <FiMaximize2 size={14} style={{cursor:'pointer', color:'var(--color-text-muted)'}}/>
          </div>
          <div className={styles.trendGrid}>
            {/* Budget utilisation */}
            <div>
              <div className={styles.trendTitle}>Budget Utilisation (%)</div>
              <div className={styles.barRow}>
                {QUARTERS.map((q, i) => (
                  <div key={q} className={styles.barBlock}>
                    <div className={styles.barWrap}>
                      <div className={styles.barFill} style={{height:`${BUDGET_B[i]}px`, background:'#00244d'}}/>
                      <div className={styles.barPctLabel}>{BUDGET_B[i]}%</div>
                    </div>
                    <div className={styles.barQLabel}>{q}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Headcount */}
            <div>
              <div className={styles.trendTitle}>Headcount</div>
              <div className={styles.barRow}>
                {QUARTERS.map((q, i) => (
                  <div key={q} className={styles.barBlock}>
                    <div className={styles.barWrap}>
                      <div className={styles.barFill} style={{height:`${(HEADCOUNT_B[i]/maxH)*100}px`, background:'#005a9c'}}/>
                      <div className={styles.barPctLabel}>{HEADCOUNT_B[i].toLocaleString()}</div>
                    </div>
                    <div className={styles.barQLabel}>{q}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><span>📅 Upcoming Meetings</span></div>
          {MEETINGS.map((m, i) => (
            <div key={i} className={styles.meetItem}>
              <div className={styles.meetDate}><div className={styles.meetDay}>{m.date.split(' ')[0]}</div><div className={styles.meetMon}>{m.date.split(' ')[1]}</div></div>
              <div>
                <div className={styles.meetTitle}>{m.title}</div>
                <div className={styles.meetType}>{m.type}</div>
                <div className={styles.meetVenue}>📍 {m.venue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.twoCol} style={{marginTop:'var(--space-md)'}}>
        {/* Board Resolutions */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>📋 Board Resolutions</span>
            <button className={styles.linkBtn}>View Full Register →</button>
          </div>
          <table className={styles.table}>
            <thead><tr><th>Reference</th><th>Resolution</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {RESOLUTIONS.map((r, i) => (
                <tr key={i}>
                  <td><code className={styles.refCode}>{r.ref}</code></td>
                  <td className={styles.resTitle}>{r.title}</td>
                  <td className={styles.resDate}>{r.date}</td>
                  <td>
                    <span className={styles.resBadge} style={{background: STATUS_STYLES[r.status].bg, color: STATUS_STYLES[r.status].color}}>
                      {STATUS_STYLES[r.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Executive Scorecards */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><span>👔 Executive Scorecards</span><span className={styles.sub2}>Q3 2024</span></div>
          {EXEC.map((e, i) => (
            <div key={i} className={styles.execRow}>
              <div className={styles.execAva}>{e.init}</div>
              <div className={styles.execInfo}>
                <div className={styles.execName}>{e.name}</div>
                <div className={styles.execRole}>{e.role}</div>
              </div>
              <div className={styles.execScore}>
                <div className={styles.scoreVal}>{e.kpi}</div>
                <div className={`${styles.scoreVar} ${parseFloat(e.variance) >= 0 ? styles.up : styles.down}`}>{e.variance}</div>
              </div>
            </div>
          ))}

          {/* Governance health footer */}
          <div className={styles.govHealth}>
            <div className={styles.govLabel}>GOVERNANCE HEALTH INDEX</div>
            <div className={styles.govBar}><div className={styles.govFill} style={{width:'91%'}}/></div>
            <div className={styles.govFooter}><span>91% — Strong</span><span>Last audit: Sep 2024</span></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
