import React from 'react';
import { FiDownload, FiZap, FiMoreVertical } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './HROfficerDashboard.module.css';

const INTERVIEWS = [
  { time:'09:00',  name:'Okello Moses',   role:'System Administrator Role', toggle:true },
  { time:'11:30',  name:'Nantongo Jesca', role:'HR Assistant Role',         toggle:true },
  { time:'02:00',  name:'Musa Ibrahim',   role:'Public Relations Officer',  toggle:false },
];

const RECORDS = [
  { init:'BK', name:'Brian Katumba',   id:'NWSC-0124', dept:'Technical Ops',  status:'active',    updated:'2 hours ago' },
  { init:'SN', name:'Sylvia Namutebi', id:'NWSC-0582', dept:'Finance',        status:'on_leave',  updated:'Yesterday'   },
  { init:'JW', name:'James Walusimbi', id:'NWSC-0911', dept:'Customer Care',  status:'probation', updated:'Apr 12, 2024' },
];

const STATUS_MAP = { active:'ACTIVE', on_leave:'ON LEAVE', probation:'PROBATION' };

const COMPLIANCE = [
  { icon:'⚠️', title:'Certification Expiry',     body:'12 technical staff licenses expiring within 30 days. Action required for recertification training.', link:'Initiate Training →' },
  { icon:'📄', title:'Tax Compliance Update',     body:'NSSF contributions for Q1 verified. All reports ready for regulatory submission.',                   link:'View Documents ⊕' },
];

export default function HROfficerDashboard() {
  return (
    <DashboardLayout portalLabel="HR Operations Portal" searchPlaceholder="Search records, staff ID, or files…">
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Operations Overview</h1>
          <p className={styles.sub}>Daily operational summary for April 14, 2024</p>
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.btnOutline}><FiDownload /> Export Report</button>
          <button className={styles.btnPrimary}><FiZap /> Quick Action</button>
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Recruitment Pipeline */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>🧑‍💼 Recruitment Pipeline</span>
            <span className={styles.badge12}>12 New Applicants</span>
          </div>
          <div className={styles.pipelineRow}>
            <div className={styles.newApps}>
              <div className={styles.pipeLabel}>NEW APPLICATIONS</div>
              <div className={styles.pipeVal}>48</div>
              <div className={styles.pipeTrend}>+12% this week</div>
            </div>
            <div className={styles.interviews}>
              <div className={styles.interviewHeader}>Interviews Scheduled (Today)</div>
              {INTERVIEWS.map((iv,i) => (
                <div key={i} className={styles.interviewRow}>
                  <span className={styles.ivTime}>{iv.time}</span>
                  <div className={styles.ivInfo}>
                    <div className={styles.ivName}>{iv.name}</div>
                    <div className={styles.ivRole}>{iv.role}</div>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked={iv.toggle}/>
                    <span className={styles.slider}/>
                  </label>
                  <button className={styles.detailsBtn}>Details</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payroll Status */}
        <div className={styles.payrollCard}>
          <div className={styles.cardHeader}>💰 Payroll Status <span className={styles.inProgress}>IN PROGRESS</span></div>
          <div className={styles.payrollSub}>April Cycle Completion</div>
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}><div className={styles.progressFill} style={{width:'78%'}}/></div>
            <div className={styles.progressPct}>78%</div>
          </div>
          <div className={styles.payrollMeta}>
            <div><div className={styles.metaLabel}>VERIFIED</div><div className={styles.metaVal}>1,240</div></div>
            <div><div className={styles.metaLabel}>PENDING</div><div className={styles.metaVal} style={{color:'var(--color-warning)'}}>342</div></div>
          </div>
          <button className={styles.validateBtn}>Run Validation Check</button>
        </div>
      </div>

      {/* Employee Records */}
      <div className={styles.card} style={{marginTop:'var(--space-md)'}}>
        <div className={styles.cardHeader}>
          <span>🗃 Employee Records Activity</span>
          <div className={styles.tabGroup}>
            <button className={`${styles.tab} ${styles.activeTab}`}>All Records</button>
            <button className={styles.tab}>Newly Onboarded</button>
            <button className={styles.tab}>Departed</button>
          </div>
        </div>
        <table className={styles.table}>
          <thead><tr><th>Employee Name</th><th>ID</th><th>Department</th><th>Status</th><th>Last Updated</th><th>Actions</th></tr></thead>
          <tbody>
            {RECORDS.map(r => (
              <tr key={r.id}>
                <td><div className={styles.empCell}><div className={styles.empAva}>{r.init}</div>{r.name}</div></td>
                <td>{r.id}</td><td>{r.dept}</td>
                <td><span className={`${styles.statusBadge} ${styles[r.status]}`}>{STATUS_MAP[r.status]}</span></td>
                <td>{r.updated}</td>
                <td><FiMoreVertical className={styles.moreIcon}/></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.viewAllBtn}>View All 1,420 Records</button>
      </div>

      <div className={styles.bottomRow}>
        {/* Compliance */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>⚖️ Compliance Tracking</span>
            <span className={styles.urgentBadge}>3 Urgent Matters</span>
          </div>
          {COMPLIANCE.map((c,i) => (
            <div key={i} className={styles.complianceItem}>
              <span className={styles.compIcon}>{c.icon}</span>
              <div>
                <div className={styles.compTitle}>{c.title}</div>
                <div className={styles.compBody}>{c.body}</div>
                <button className={styles.compLink}>{c.link}</button>
              </div>
            </div>
          ))}
        </div>

        {/* KPIs */}
        <div className={styles.kpiStack}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>TOTAL WORKFORCE</div>
            <div className={styles.kpiVal}>2,481</div>
            <div className={styles.kpiTrend}>+5% vs last quarter</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>RETENTION RATE</div>
            <div className={styles.kpiVal}>94%</div>
            <div className={styles.retentionBar}><div className={styles.retentionFill} style={{width:'94%'}}/></div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>SYSTEM INTEGRITY</div>
            <div className={styles.integrityRow}><span className={styles.greenDot}/>LIVE MO...</div>
            <div className={styles.integritySub}>Last backup: 14:00 PM (Successful)</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
