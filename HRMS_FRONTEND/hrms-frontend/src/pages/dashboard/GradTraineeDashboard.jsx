import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './GradTraineeDashboard.module.css';

const COURSES = [
  { tag:'TECHNICAL', title:'Sustainable Urban Water Supply',     progress:45, timeLeft:'6h 45m left' },
  { tag:'LEADERSHIP', title:'Effective Governance in Utilities', progress:12, timeLeft:'12h left'     },
];

const LIVE = [
  { time:'TOMORROW, 09:00 AM', title:'HRMS Advanced Workshop',    sub:'Virtual Session via Teams', action:'Join Meeting' },
  { time:'FRIDAY, 02:30 PM',   title:'Water Quality Analytics',   sub:'Main Lab, Hall B',          action:'Join Meeting' },
];

export default function GradTraineeDashboard() {
  return (
    <DashboardLayout portalLabel="HR Operations Portal" searchPlaceholder="Search courses, certificates…">
      <div className={styles.topRow}>
        <div className={styles.welcomeCard}>
          <div className={styles.memberTag}>MEMBER SINCE 2022</div>
          <h1 className={styles.welcomeTitle}>Welcome back, Arthur.</h1>
          <p className={styles.welcomeSub}>Your journey toward excellence in water management and governance continues today. You are 75% through your "Leadership in Utility Management" course.</p>
          <button className={styles.continueBtn}>Continue Learning</button>
        </div>

        <div className={styles.progressPanel}>
          <div className={styles.progressLabel}>GLOBAL LEARNING PROGRESS</div>
          <div className={styles.progressHours}>128 <span>HOURS TOTAL</span></div>
          <div className={styles.progressBar}><div className={styles.progressFill} style={{width:'75%'}}/></div>
          <div className={styles.progressStats}>
            <div><div className={styles.psVal}>14</div><div className={styles.psLbl}>Completed Courses</div></div>
            <div><div className={styles.psVal}>Top 5%</div><div className={styles.psLbl}>Rank</div></div>
          </div>
        </div>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.leftCol}>
          {/* Current Curriculum */}
          <div className={styles.card}>
            <div className={styles.cardHeader}><span>Current Curriculum</span><button className={styles.viewAll}>VIEW ALL →</button></div>
            <div className={styles.courseGrid}>
              {COURSES.map((c,i) => (
                <div key={i} className={styles.courseCard}>
                  <span className={styles.courseTag} style={{background: c.tag==='TECHNICAL'?'#005a9c':'#28a745'}}>{c.tag}</span>
                  <div className={styles.courseImg}/>
                  <div className={styles.courseTitle}>{c.title}</div>
                  <div className={styles.courseBar}><div className={styles.courseFill} style={{width:`${c.progress}%`}}/></div>
                  <div className={styles.courseTime}>{c.timeLeft}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Training */}
        <div className={styles.card}>
          <div className={styles.cardHeader}><span>Live Training</span></div>
          {LIVE.map((l,i) => (
            <div key={i} className={styles.liveItem}>
              <div className={styles.liveTime}>{l.time}</div>
              <div className={styles.liveTitle}>{l.title}</div>
              <div className={styles.liveSub}>{l.sub}</div>
              <button className={styles.joinBtn}>{l.action}</button>
            </div>
          ))}

          {/* Next Milestone */}
          <div className={styles.milestoneCard}>
            <div className={styles.mileTitle}>🏆 Next Milestone</div>
            <p className={styles.mileSub}>Complete the &apos;Strategic Planning&apos; assessment to earn your Senior Specialist Badge.</p>
            <div className={styles.mileProgress}>
              <div className={styles.mileBar}><div className={styles.mileFill} style={{width:'40%'}}/></div>
              <span className={styles.mileCount}>REMAINING TASKS: 2/5</span>
            </div>
            <div className={styles.milePct}>40%</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
