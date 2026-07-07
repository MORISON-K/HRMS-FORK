import React, { useState } from 'react';
import { FiActivity, FiDatabase, FiShield, FiUsers, FiAlertTriangle, FiRefreshCw, FiDownload } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './AdminDashboard.module.css';

const SESSIONS = [
  { init:'EO', name:'Emmanuel Okello', email:'e.okello@nwsc.co.ug', role:'HR Manager',      dept:'Headquarters', last:'Just now', status:'online' },
  { init:'JM', name:'Jane Musoke',     email:'j.musoke@nwsc.co.ug',  role:'Payroll Officer', dept:'Finance',      last:'14m ago',  status:'online' },
  { init:'BA', name:'Brian Atwine',    email:'b.atwine@nwsc.co.ug',  role:'System Audit',   dept:'ICT Ops',      last:'2h ago',   status:'idle'   },
];

const ALERTS = [
  { type:'danger',  title:'Failed Login Attempt',    body:'Multiple failed attempts on Admin IP: 192.168.1.45 — 12:01 AM today' },
  { type:'warning', title:'Database Backup Delayed', body:'Nightly sync for Jinja Region timed out — 00:02 AM today' },
];

const LOGS = [
  { init:'SA', action:'New Employee Record Added',   meta:'By Sarah K. (Admin) • 5m ago' },
  { init:'PM', action:'Payroll Policy Updated',      meta:'System Global Change • 43m ago' },
  { init:'SY', action:'System Patch Applied v2.4.1', meta:'Auto-update • 2h ago' },
];

const BARS = [
  { city:'Kampala',   h:80, primary:true },
  { city:'Entebbe',   h:45 },
  { city:'Jinja',     h:55 },
  { city:'Mbarara',   h:35 },
  { city:'Gulu',      h:30 },
  { city:'Lira',      h:28 },
  { city:'Ft.Portal', h:20 },
];

export default function AdminDashboard() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <DashboardLayout portalLabel="HR Operations Portal" searchPlaceholder="Search system resources…">
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>System Administration Dashboard</h1>
          <p className={styles.sub}>Real-time infrastructure health and governance overview.</p>
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.btnOutline}><FiRefreshCw /> Force Re-Sync</button>
          <button className={styles.btnPrimary}><FiDownload /> Export Status</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}><FiActivity /> SERVICE UPTIME</div>
          <div className={styles.kpiVal}>99.98%</div>
          <div className={styles.kpiOk}>● All primary clusters operational</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}><FiDatabase /> DATABASE LOAD</div>
          <div className={styles.kpiVal}>14.2 <span className={styles.kpiUnit}>ms</span></div>
          <div className={styles.kpiOk}>▼ 8% lower than average</div>
        </div>
        <div className={styles.threatsCard}>
          <div className={styles.threatsTop}><FiShield className={styles.shieldIcon}/> ACTIVE THREATS</div>
          <div className={styles.threatsNum}>00</div>
          <div className={styles.threatsTxt}>All security protocols verified (Last scan: 2m ago)</div>
          <button className={styles.logsBtn}>View Security Logs</button>
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Sessions */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span><FiUsers /> Active User Sessions</span>
            <button className={styles.linkBtn}>Manage All →</button>
          </div>
          <table className={styles.table}>
            <thead><tr><th>User</th><th>Role</th><th>Department</th><th>Last Activity</th><th>Status</th></tr></thead>
            <tbody>
              {SESSIONS.map(s => (
                <tr key={s.email}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.ava}>{s.init}</div>
                      <div><div className={styles.uName}>{s.name}</div><div className={styles.uEmail}>{s.email}</div></div>
                    </div>
                  </td>
                  <td>{s.role}</td><td>{s.dept}</td><td>{s.last}</td>
                  <td><span className={`${styles.statusPill} ${styles[s.status]}`}>{s.status.toUpperCase()}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div className={styles.rightStack}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span><FiAlertTriangle style={{color:'#FFC107'}}/> System Alerts</span>
              <span className={styles.newBadge}>3 NEW</span>
            </div>
            {ALERTS.map((a,i) => (
              <div key={i} className={`${styles.alertItem} ${a.type === 'danger' ? styles.alertDanger : styles.alertWarning}`}>
                <div className={styles.alertTitle}>{a.title}</div>
                <div className={styles.alertBody}>{a.body}</div>
              </div>
            ))}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}><span>Audit Logs</span></div>
            {LOGS.map((l,i) => (
              <div key={i} className={styles.logRow}>
                <div className={styles.logAva}>{l.init}</div>
                <div><div className={styles.logAction}>{l.action}</div><div className={styles.logMeta}>{l.meta}</div></div>
              </div>
            ))}
            <button className={styles.viewAll}>VIEW ALL LOGS</button>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className={styles.twoCol} style={{marginTop:'var(--space-md)'}}>
        <div className={styles.card}>
          <div className={styles.cardHeader}><span>Network Traffic Analysis</span></div>
          <p className={styles.chartSub}>Internal traffic between NWSC regional sub nodes.</p>
          <div className={styles.barChart}>
            {BARS.map(b => (
              <div key={b.city} className={styles.barItem}>
                <div className={styles.barFill} style={{height:`${b.h}px`, background: b.primary ? '#00244d' : '#c8dcf0'}}/>
                <div className={styles.barLabel}>{b.city}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rightStack}>
          <div className={`${styles.card} ${styles.centerCard}`}>
            <div className={styles.pendingNum}>4</div>
            <div className={styles.pendingTxt}>Pending Updates</div>
            <div className={styles.pendingSub}>Modules waiting</div>
          </div>
          <div className={`${styles.card} ${styles.centerCard}`}>
            <div className={styles.storageNum}>2.4 TB</div>
            <div className={styles.storageTxt}>Storage Utilized</div>
          </div>
        </div>
      </div>

      {!dismissed && (
        <div className={styles.notifBar}>
          <div>
            <div className={styles.notifLabel}>SYSTEM NOTIFICATION</div>
            <strong>Scheduled Maintenance Window</strong>
            <span className={styles.notifDetail}> — Sun 12th Aug at 23:00 EAT (Duration: 3h)</span>
          </div>
          <button className={styles.dismissBtn} onClick={() => setDismissed(true)}>Dismiss</button>
        </div>
      )}
    </DashboardLayout>
  );
}
