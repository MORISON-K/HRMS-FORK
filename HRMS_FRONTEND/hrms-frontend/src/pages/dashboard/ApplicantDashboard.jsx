import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './ApplicantDashboard.module.css';

const APPLICATIONS = [
  { icon:'💧', title:'Senior Water Engineer',  date:'Applied: Oct 24, 2023', ref:'Ref: NWSC-2023-089', status:'interview', progress:75 },
  { icon:'📊', title:'Data Analyst (Operations)', date:'Applied: Nov 02, 2023', ref:'Ref: NWSC-2023-112', status:'review',   progress:40 },
  { icon:'🔒', title:'Cybersecurity Specialist', date:'Applied: Sep 15, 2023', ref:'Ref: NWSC-2023-045', status:'closed',   progress:0  },
];

const RECOMMENDED = [
  { icon:'🏦', title:'Financial Controller',  location:'Kampala Head Office',  dept:'Finance Dept', salary:'$3.2k - $4.5k', type:'FULL TIME' },
  { icon:'🔧', title:'Plant Supervisor',      location:'Gulu Regional Office', dept:'Operations',    salary:'$2.3k - $2.8k', type:'CONTRACT'  },
];

const ONBOARDING = [
  { label:'Upload National ID',      done:true,  note:'Verified on Oct 26' },
  { label:'Sign Offer Letter',       done:true,  note:'Completed Oct 10'   },
  { label:'Medical Examination',     done:false, note:'Due by Nov 10',  cta:'Schedule Now' },
  { label:'Background Check Consent',done:false, note:'Unlocks after medical' },
];

const STATUS_COLORS = { interview:'#005a9c', review:'#856404', closed:'#dc3545' };
const STATUS_LABELS = { interview:'INTERVIEW STAGE', review:'UNDER REVIEW', closed:'CLOSED' };

export default function ApplicantDashboard() {
  return (
    <DashboardLayout portalLabel="" searchPlaceholder="Search applications, jobs…">
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome back, Joshua!</h1>
          <p className={styles.welcomeSub}>You&apos;re making great progress. You have one interview scheduled for tomorrow and 3 onboarding tasks pending.</p>
          <div className={styles.welcomeBtns}>
            <button className={styles.btnPrimary}>View Interview</button>
            <button className={styles.btnOutline}>Complete Profile</button>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          {/* My Applications */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>🗂 My Applications</span>
              <button className={styles.viewAll}>View All →</button>
            </div>
            {APPLICATIONS.map((a,i) => (
              <div key={i} className={styles.appRow}>
                <div className={styles.appIcon}>{a.icon}</div>
                <div className={styles.appInfo}>
                  <div className={styles.appTitle}>{a.title}</div>
                  <div className={styles.appMeta}>{a.date} • {a.ref}</div>
                </div>
                <div className={styles.appStatus}>
                  <span className={styles.statusBadge} style={{background: a.status==='closed'?'#fdecea':a.status==='interview'?'#eaf0ff':'#fffbe6', color:STATUS_COLORS[a.status]}}>
                    {STATUS_LABELS[a.status]}
                  </span>
                  {a.progress > 0 && (
                    <div className={styles.appBar}><div className={styles.appBarFill} style={{width:`${a.progress}%`, background:STATUS_COLORS[a.status]}}/></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Recommended */}
          <div className={styles.card} style={{marginTop:'var(--space-md)'}}>
            <div className={styles.cardHeader}>
              <span>⭐ Recommended For You</span>
              <div style={{display:'flex',gap:'4px'}}>
                <button className={styles.navBtn}>‹</button>
                <button className={styles.navBtn}>›</button>
              </div>
            </div>
            <div className={styles.jobGrid}>
              {RECOMMENDED.map((j,i) => (
                <div key={i} className={styles.jobCard}>
                  <div className={styles.jobHeader}>
                    <div className={styles.jobIcon}>{j.icon}</div>
                    <span className={styles.jobType}>{j.type}</span>
                  </div>
                  <div className={styles.jobTitle}>{j.title}</div>
                  <div className={styles.jobLocation}>{j.location} • {j.dept}</div>
                  <div className={styles.jobFooter}>
                    <span className={styles.jobSalary}>{j.salary}</span>
                    <button className={styles.applyBtn}>Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          {/* Onboarding */}
          <div className={styles.card}>
            <div className={styles.cardHeader}><span>✅ Onboarding</span></div>
            <div className={styles.onboardProgress}>4 of 7 tasks completed</div>
            {ONBOARDING.map((o,i) => (
              <div key={i} className={styles.onboardItem}>
                <div className={`${styles.onboardCheck} ${o.done ? styles.checked : ''}`}>{o.done ? '✓' : ''}</div>
                <div>
                  <div className={`${styles.onboardLabel} ${o.done ? styles.done : ''}`}>{o.label}</div>
                  <div className={styles.onboardNote}>{o.note}</div>
                  {o.cta && <button className={styles.scheduleBtn}>{o.cta}</button>}
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Interview */}
          <div className={styles.interviewCard}>
            <div className={styles.ivTag}>UPCOMING</div>
            <div className={styles.ivTitle}>Technical Interview</div>
            <div className={styles.ivRole}>Senior Water Engineer Role</div>
            <div className={styles.ivDetails}>
              <div>📅 Tomorrow, Nov 7</div>
              <div>🕙 10:00 AM – 11:30 AM</div>
              <div>💻 Microsoft Teams</div>
            </div>
            <button className={styles.joinBtn}>Join Meeting</button>
          </div>

          {/* Profile Strength */}
          <div className={styles.card}>
            <div className={styles.profileLabel}>PROFILE STRENGTH</div>
            <div className={styles.profilePct}>82%</div>
            <div className={styles.profileRating}>Excellent</div>
            <div className={styles.profileBar}><div className={styles.profileFill} style={{width:'82%'}}/></div>
            <p className={styles.profileTip}>Add your <strong>Project Portfolio</strong> to reach 100% and increase match rate.</p>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        © 2023 National Water and Sewerage Corporation. All rights reserved. &nbsp;
        <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a> · <a href="/contact">Contact Support</a>
      </div>
    </DashboardLayout>
  );
}
