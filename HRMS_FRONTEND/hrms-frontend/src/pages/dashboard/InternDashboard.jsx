import React, { useState } from 'react';
import { FiDownload, FiCheck, FiMoreVertical, FiMessageSquare } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './InternDashboard.module.css';

const TASKS = [
  { id:1, text:'Submit Weekly Activity Report — Week 6',          due:'Due today',      done:false, urgent:true  },
  { id:2, text:'Attend Water Quality Lab Orientation',            due:'Tomorrow 9:00 AM', done:false, urgent:false },
  { id:3, text:'Complete HSE Safety Induction Module',            due:'Due in 3 days',  done:false, urgent:false },
  { id:4, text:'Submit signed Internship Agreement copy to HR',   due:'Completed',      done:true,  urgent:false },
  { id:5, text:'Meet with supervisor — progress check-in',        due:'Completed',      done:true,  urgent:false },
];

const ATTENDANCE = [
  { day:'Mon', status:'present' }, { day:'Tue', status:'present' }, { day:'Wed', status:'present' },
  { day:'Thu', status:'absent'  }, { day:'Fri', status:'present' }, { day:'Mon', status:'present' },
  { day:'Tue', status:'present' }, { day:'Wed', status:'present' }, { day:'Thu', status:'present' },
  { day:'Fri', status:'half'    },
];

const MODULES = [
  { title:'Water Treatment Fundamentals', progress:100, done:true  },
  { title:'HSE Safety & Field Protocol',  progress:65,  done:false },
  { title:'NWSC Customer Service Ethics', progress:40,  done:false },
  { title:'Finance & Billing Systems',    progress:10,  done:false },
];

const DEADLINES = [
  { date:'25 OCT', label:'Mid-term Report Submission',    type:'report'   },
  { date:'10 NOV', label:'Field Assignment Presentation', type:'present'  },
  { date:'30 NOV', label:'Final Internship Report',       type:'final'    },
  { date:'05 DEC', label:'Certificate Collection',        type:'cert'     },
];

const TYPE_COLORS = { report:'#005a9c', present:'#f5a623', final:'#dc3545', cert:'#28a745' };

export default function InternDashboard() {
  const [tasks, setTasks] = useState(TASKS);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const doneCount = tasks.filter(t => t.done).length;
  const internProgress = 62; // % of internship period elapsed

  function toggle(id) {
    setTasks(ts => ts.map(t => t.id === id ? {...t, done: !t.done} : t));
  }

  return (
    <DashboardLayout portalLabel="HR Operations Portal" searchPlaceholder="Search modules, tasks, resources…">
      {/* Welcome banner */}
      <div className={styles.banner}>
        <div className={styles.bannerLeft}>
          <div className={styles.internTag}>INTERN · TECHNICAL DIVISION · SINCE SEP 2024</div>
          <h1 className={styles.bannerTitle}>{greeting}, Grace.</h1>
          <p className={styles.bannerSub}>You are {internProgress}% through your internship period. Keep up the great work — your supervisor rated your last week <strong style={{color:'#f5a623'}}>Excellent</strong>.</p>
          <div className={styles.bannerProgress}>
            <div className={styles.bannerBar}><div className={styles.bannerFill} style={{width:`${internProgress}%`}}/></div>
            <span className={styles.bannerPct}>{internProgress}% Complete</span>
          </div>
        </div>
        <div className={styles.bannerRight}>
          <div className={styles.daysLeft}><div className={styles.daysNum}>47</div><div className={styles.daysSub}>Days Remaining</div></div>
          <div className={styles.endDate}>Ends: 30 Nov 2024</div>
          <button className={styles.downloadBtn}><FiDownload /> Download Letter</button>
        </div>
      </div>

      <div className={styles.topStats}>
        <div className={styles.statCard}><div className={styles.statVal}>92%</div><div className={styles.statLbl}>Attendance Rate</div><div className={styles.statSub}>9 of 10 days present</div></div>
        <div className={styles.statCard}><div className={styles.statVal}>{doneCount}/{tasks.length}</div><div className={styles.statLbl}>Tasks Completed</div><div className={styles.statSub}>This week</div></div>
        <div className={styles.statCard}><div className={styles.statVal}>4.6</div><div className={styles.statLbl}>Supervisor Rating</div><div className={styles.statSub}>Out of 5.0 — Week 6</div></div>
        <div className={styles.statCard}><div className={styles.statVal}>3/4</div><div className={styles.statLbl}>Modules in Progress</div><div className={styles.statSub}>1 completed</div></div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          {/* Weekly Tasks */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>📋 Weekly Task List</span>
              <span className={styles.taskCount}>{doneCount}/{tasks.length} done</span>
            </div>
            {tasks.map(t => (
              <div key={t.id} className={`${styles.taskRow} ${t.done ? styles.taskDone : ''}`}>
                <button className={`${styles.taskCheck} ${t.done ? styles.checked : ''}`} onClick={() => toggle(t.id)}>
                  {t.done && <FiCheck size={10}/>}
                </button>
                <div className={styles.taskBody}>
                  <div className={styles.taskText}>{t.text}</div>
                  <div className={`${styles.taskDue} ${t.urgent ? styles.urgent : ''}`}>{t.due}</div>
                </div>
                <FiMoreVertical className={styles.moreIcon}/>
              </div>
            ))}
          </div>

          {/* Learning Modules */}
          <div className={styles.card} style={{marginTop:'var(--space-md)'}}>
            <div className={styles.cardHeader}><span>📚 Training Modules</span><button className={styles.viewAll}>View All →</button></div>
            {MODULES.map((m, i) => (
              <div key={i} className={styles.moduleRow}>
                <div className={styles.moduleIcon}>{m.done ? '✅' : '📖'}</div>
                <div className={styles.moduleInfo}>
                  <div className={styles.moduleTitle}>{m.title}</div>
                  <div className={styles.moduleBar}><div className={styles.moduleFill} style={{width:`${m.progress}%`, background: m.done ? '#28a745' : '#005a9c'}}/></div>
                </div>
                <div className={styles.modulePct} style={{color: m.done ? '#28a745' : '#005a9c'}}>{m.progress}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightCol}>
          {/* Supervisor Card */}
          <div className={styles.supervisorCard}>
            <div className={styles.supLabel}>YOUR SUPERVISOR</div>
            <div className={styles.supRow}>
              <div className={styles.supAva}>SN</div>
              <div>
                <div className={styles.supName}>Sarah Naibasa</div>
                <div className={styles.supRole}>Senior HR Officer</div>
                <div className={styles.supEmail}>s.naibasa@nwsc.co.ug</div>
              </div>
            </div>
            <button className={styles.chatBtn}><FiMessageSquare /> Message Supervisor</button>
          </div>

          {/* Attendance Tracker */}
          <div className={styles.card}>
            <div className={styles.cardHeader}><span>📅 Attendance (Last 10 Days)</span></div>
            <div className={styles.attendGrid}>
              {ATTENDANCE.map((a, i) => (
                <div key={i} className={styles.attendCell}>
                  <div className={`${styles.attendDot} ${styles[a.status]}`}/>
                  <div className={styles.attendDay}>{a.day}</div>
                </div>
              ))}
            </div>
            <div className={styles.attendLegend}>
              <span><span className={`${styles.legendDot} ${styles.present}`}/>Present</span>
              <span><span className={`${styles.legendDot} ${styles.absent}`}/>Absent</span>
              <span><span className={`${styles.legendDot} ${styles.half}`}/>Half Day</span>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className={styles.card}>
            <div className={styles.cardHeader}><span>⏰ Key Deadlines</span></div>
            {DEADLINES.map((d, i) => (
              <div key={i} className={styles.deadlineRow}>
                <div className={styles.ddDate} style={{background: TYPE_COLORS[d.type]}}>
                  <div className={styles.ddDay}>{d.date.split(' ')[0]}</div>
                  <div className={styles.ddMon}>{d.date.split(' ')[1]}</div>
                </div>
                <div className={styles.ddLabel}>{d.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Resources */}
          <div className={styles.card}>
            <div className={styles.cardHeader}><span>🔗 Quick Resources</span></div>
            <div className={styles.resourceGrid}>
              {['Internship Guide','HR Policy','Safety Handbook','Leave Request'].map(r => (
                <button key={r} className={styles.resourceBtn}>📄 {r}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        © 2024 National Water and Sewerage Corporation. All rights reserved. &nbsp;
        <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a> · <a href="/help">Help Center</a>
      </div>
    </DashboardLayout>
  );
}
