import React from 'react';
import { FiDownload, FiCalendar, FiMaximize2 } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './HRDirectorDashboard.module.css';

const KPI = [
  { label:'Total Headcount', value:'4,821', sub:'TARGET: 5,000', trend:'+2.4%', up:true },
  { label:'Gender Diversity (F)', value:'38.5%', sub:'ACTIVE PLAN', trend:'-0.8%', up:false },
  { label:'Turnover Rate', value:'4.2%', sub:'INDUSTRY AVG: 6.5%', trend:null },
  { label:'Vacancy Rate', value:'1.8%', sub:'LOW RISK', extra:'12 Open' },
];

const MONTHS = ['OCT','NOV','DEC','JAN','FEB','MAR'];
const BUDGET = [65, 70, 72, 68, 75, 78];
const ACTUAL = [60, 66, 68, 71, 72, 74];

const DEPTS = [
  { name:'Water Engineering',  staff:1240, eff:94, ot:'UGX 45M',  status:'optimal',  statusLabel:'OPTIMAL'  },
  { name:'Network Maintenance',staff:2015, eff:82, ot:'UGX 120M', status:'highcost',  statusLabel:'HIGH COST' },
  { name:'Customer Services',  staff:842,  eff:89, ot:'UGX 12M',  status:'stable',   statusLabel:'STABLE'   },
];

export default function HRDirectorDashboard() {
  const maxB = Math.max(...BUDGET);
  return (
    <DashboardLayout portalLabel="" searchPlaceholder="Search HR Operations Portal…">
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Strategic Management Dashboard</h1>
          <p className={styles.sub}>FY 2023/24 Q3 Performance &amp; Workforce Analytics</p>
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.btnOutline}><FiDownload /> Export Report</button>
          <button className={styles.btnPrimary}><FiCalendar /> Mar 2024</button>
        </div>
      </div>

      {/* KPI row */}
      <div className={styles.kpiRow}>
        {KPI.map((k,i) => (
          <div key={i} className={styles.kpiCard}>
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiVal}>{k.value}</div>
            <div className={styles.kpiSub}>{k.sub}</div>
            {k.trend && <div className={`${styles.trend} ${k.up ? styles.up : styles.down}`}>{k.trend}</div>}
            {k.extra && <div className={styles.extra}>{k.extra}</div>}
          </div>
        ))}
      </div>

      <div className={styles.twoCol}>
        {/* Budget vs Actual chart */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>Workforce Spending: Budget vs. Actual</span>
            <div className={styles.legend}>
              <span className={styles.legendBudget}>● Budget</span>
              <span className={styles.legendActual}>● Actual</span>
              <FiMaximize2 size={14} style={{cursor:'pointer',color:'var(--color-text-muted)'}}/>
            </div>
          </div>
          <div className={styles.barGroup}>
            {MONTHS.map((m,i) => (
              <div key={m} className={styles.barPair}>
                <div className={styles.bars}>
                  <div className={styles.budgetBar} style={{height:`${(BUDGET[i]/maxB)*100}px`}}/>
                  <div className={styles.actualBar} style={{height:`${(ACTUAL[i]/maxB)*100}px`}}/>
                </div>
                <div className={styles.barMonth}>{m}</div>
              </div>
            ))}
          </div>
          <div className={styles.chartFooter}>
            <div><span className={styles.footerLabel}>TOTAL BUDGET</span><br/><strong>UGX 1.2B</strong></div>
            <div><span className={styles.footerLabel}>TOTAL SPENT</span><br/><strong>UGX 1.05B</strong></div>
            <div><span className={styles.footerLabel}>VARIANCE</span><br/><strong className={styles.variance}>-12.5%</strong></div>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><span>Regional Distribution</span><FiMaximize2 size={14} style={{cursor:'pointer',color:'var(--color-text-muted)'}}/></div>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapDot} style={{top:'30%',left:'55%'}}/>
            <div className={styles.mapDot} style={{top:'50%',left:'40%'}}/>
            <div className={styles.mapDot} style={{top:'65%',left:'60%'}}/>
            <div className={styles.mapLabel} style={{color:'var(--color-text-muted)',position:'absolute',bottom:'8px',left:'8px',fontSize:'0.7rem'}}>Uganda</div>
          </div>
          <div className={styles.regions}>
            <div className={styles.regionRow}><span className={styles.dot} style={{background:'#00244d'}}/>Central Region<strong style={{marginLeft:'auto'}}>50%</strong></div>
            <div className={styles.regionRow}><span className={styles.dot} style={{background:'#005a9c'}}/>Western Region<strong style={{marginLeft:'auto'}}>18%</strong></div>
            <div className={styles.regionRow}><span className={styles.dot} style={{background:'#c8dcf0'}}/>Eastern Region<strong style={{marginLeft:'auto'}}>15%</strong></div>
          </div>
        </div>
      </div>

      {/* Dept Efficiency */}
      <div className={styles.card} style={{marginTop:'var(--space-md)'}}>
        <div className={styles.cardHeader}>
          <span>Departmental Efficiency Matrix</span>
          <div style={{display:'flex',gap:'8px'}}>
            <button className={styles.iconBtn}>≡</button>
            <button className={styles.iconBtn}>⋮</button>
          </div>
        </div>
        <table className={styles.table}>
          <thead><tr><th>Department</th><th>Staff Count</th><th>Efficiency Index</th><th>Overtime Cost</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {DEPTS.map(d => (
              <tr key={d.name}>
                <td className={styles.deptName}>{d.name}</td>
                <td>{d.staff.toLocaleString()}</td>
                <td>{d.eff}%</td>
                <td>{d.ot}</td>
                <td><span className={`${styles.statusBadge} ${styles[d.status]}`}>{d.statusLabel}</span></td>
                <td><button className={styles.actionBtn}>{d.status === 'highcost' ? 'AUDIT' : d.status === 'optimal' ? 'REALLOCATE' : 'VIEW'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
