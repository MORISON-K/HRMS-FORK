import React from 'react';
import { FiCheck, FiX, FiEye } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './DeptHeadDashboard.module.css';

const QUEUE = [
  { init:'NK', name:'Namugerwa Kevin', dept:'Tech Ops',     type:'Annual Leave',    period:'Oct 12 - Oct 15', status:'awaiting' },
  { init:'OM', name:'Okello Moses',    dept:'Engineering',  type:'Overtime Approval',period:'8.5 hrs (Sep 28)', status:'review'  },
  { init:'SB', name:'Sarah Birungi',   dept:'Finance',      type:'Sick Leave',      period:'Oct 05 (1 Day)',   status:'awaiting' },
];

const SHIFTS = [
  { label:'Morning Shift (06:00 - 14:00)', sub:'42 Personnel allocated across 6 stations.', tag:'Optimal',      tagColor:'#28a745', understaffed:false },
  { label:'Afternoon Shift (14:00 - 22:00)',sub:'36 Personnel allocated across 5 stations.', tag:'Allocated',   tagColor:'#005a9c', understaffed:false },
  { label:'Night Shift (22:00 - 06:00)',    sub:'Only 12 Personnel allocated. Minimum required: 15.', tag:'Understaffed', tagColor:'#dc3545', understaffed:true },
];

export default function DeptHeadDashboard() {
  return (
    <DashboardLayout portalLabel="HR Operations Portal" searchPlaceholder="Search team members or requests…">
      <div className={styles.header}>
        <div>
          <p className={styles.overline}>OPERATIONAL OVERSIGHT</p>
          <h1 className={styles.title}>Department Manager Dashboard</h1>
        </div>
        <div className={styles.headerBtns}>
          <button className={styles.btnTab}>Real-time</button>
          <button className={styles.btnTab}>Historical</button>
          <button className={styles.btnTabActive}>All Stations</button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiAttend}>
          <div className={styles.kpiAttendPct}>94% Attendance</div>
          <div className={styles.kpiAttendSub}>Present Today</div>
          <div className={styles.kpiAttendVal}>142 <span>/151 Staff</span></div>
          <div className={styles.kpiAttendWarn}>⚠ 9 Absentees without notice</div>
        </div>
        <div className={`${styles.kpiCard} ${styles.urgent}`}>
          <div className={styles.urgentTag}>Urgent</div>
          <div className={styles.kpiLabel}>Pending Approvals</div>
          <div className={styles.kpiVal}>18</div>
          <div className={styles.kpiSub}>Active Requests</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.perfLabel}>Performance Index</div>
          <div className={styles.perfSub}>Quarterly Departmental Efficiency</div>
          <div className={styles.perfVal}>8.2 <span className={styles.kpiScore}>KPI SCORE</span></div>
          <div className={styles.perfBars}>
            {['WATER\nSUPPLY','MAINTE-\nNANCE','BILLING OPS','CUSTOMER\nSVC'].map((l,i) => (
              <div key={i} className={styles.perfBarItem}>
                <div className={styles.perfBar} style={{height:`${[60,45,75,50][i]}px`}}/>
                <div className={styles.perfBarLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Approval Queue */}
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div><div className={styles.cardTitle}>Approval Queue</div><div className={styles.cardSub}>Review leave and timesheet submissions</div></div>
              <button className={styles.viewAllBtn}>View All Queue</button>
            </div>
            <table className={styles.table}>
              <thead><tr><th>Staff Member</th><th>Request Type</th><th>Period</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {QUEUE.map((q,i) => (
                  <tr key={i}>
                    <td><div className={styles.empCell}><div className={styles.ava}>{q.init}</div><div><div className={styles.empName}>{q.name}</div><div className={styles.empDept}>{q.dept}</div></div></div></td>
                    <td>{q.type}</td><td>{q.period}</td>
                    <td><span className={`${styles.sBadge} ${q.status === 'review' ? styles.review : styles.awaiting}`}>{q.status === 'review' ? 'REVIEW' : 'AWAITING MANAGER'}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.approveBtn}><FiCheck size={12}/></button>
                        <button className={styles.rejectBtn}><FiX size={12}/></button>
                        <button className={styles.viewBtn}><FiEye size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Morale */}
          <div className={styles.card} style={{marginTop:'var(--space-md)'}}>
            <div className={styles.cardTitle}>Team Morale &amp; Pulse</div>
            <div className={styles.moraleRow}><span>Engagement Score</span><span style={{fontSize:'0.75rem',color:'var(--color-text-muted)'}}>High (86%)</span></div>
            <div className={styles.moraleBar}><div className={styles.moraleFill} style={{width:'86%',background:'var(--color-primary)'}}/></div>
            <div className={styles.moraleRow} style={{marginTop:'var(--space-sm)'}}><span>Burnout Risk</span><span style={{fontSize:'0.75rem',color:'var(--color-text-muted)'}}>Low (12%)</span></div>
            <div className={styles.moraleBar}><div className={styles.moraleFill} style={{width:'12%',background:'var(--color-danger)'}}/></div>
            <div className={styles.moraleGrid}>
              <div><div className={styles.mgVal}>04</div><div className={styles.mgLbl}>OPEN ROLLS<br/>In Interview Phase</div></div>
              <div><div className={styles.mgVal}>02</div><div className={styles.mgLbl}>BIRTHDAYS<br/>This Week</div></div>
            </div>
          </div>
        </div>

        {/* Shift Planning */}
        <div className={styles.rightCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Shift Planning</div>
              <button className={styles.moreBtn}>⋮</button>
            </div>
            {SHIFTS.map((s,i) => (
              <div key={i} className={styles.shiftItem}>
                <div className={styles.shiftHeader}>
                  <span className={styles.shiftLabel}>{s.label}</span>
                  <span className={styles.shiftTag} style={{background:s.tagColor}}>{s.tag}</span>
                </div>
                <div className={styles.shiftSub}>{s.sub}</div>
                {s.understaffed && <button className={styles.reallocBtn}>REALLOCATE RESOURCES</button>}
              </div>
            ))}
            <button className={styles.fullScheduleBtn}>Full Schedule View</button>
          </div>

          {/* Map */}
          <div className={styles.card} style={{marginTop:'var(--space-md)'}}>
            <div className={styles.cardTitle}>Regional Deployment Map</div>
            <div className={styles.mapArea}>
              <div className={styles.mapDot} style={{top:'30%',left:'50%'}}/>
              <div className={styles.mapDot} style={{top:'55%',left:'45%'}}/>
              <div className={styles.mapDot} style={{top:'70%',left:'55%'}}/>
            </div>
            <div className={styles.activeSite}>
              <div><strong>Active Site: Ggaba III</strong><br/><span style={{fontSize:'0.7rem',color:'var(--color-text-muted)'}}>Capacity: 100% | Staff: 26 Present</span></div>
              <div style={{display:'flex',gap:'4px'}}>
                <button className={styles.detailBtn}>DETAILS</button>
                <button className={styles.viewLogBtn}>VIEW LOG</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
