import React, { useState } from 'react';
import { FiPrinter, FiEdit, FiPlus, FiMoreVertical, FiMessageSquare } from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './EmployeeDashboard.module.css';

const TASKS = [
  { id:1, text:'Complete Q4 Performance Self-Review', due:'Due today', done:false },
  { id:2, text:'Update health insurance dependents', due:'Due in 3 days', done:false },
  { id:3, text:'Submit-water-sample-logistics-report', due:'Completed', done:true },
];

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState(TASKS);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  function toggleTask(id) {
    setTasks(t => t.map(x => x.id === id ? {...x, done:!x.done} : x));
  }

  return (
    <DashboardLayout portalLabel="" searchPlaceholder="Search HR portal…">
      <div className={styles.topRow}>
        <div>
          <h1 className={styles.greeting}>{greeting}, Alex</h1>
          <p className={styles.greetingSub}>Here is an overview of your professional profile and upcoming tasks.</p>
        </div>
        <div className={styles.topBtns}>
          <button className={styles.btnOutline}><FiPrinter /> Print Profile</button>
          <button className={styles.btnPrimary}><FiEdit /> Update Info</button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileImgWrap}>
            <div className={styles.profileImg}>AM</div>
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.empName}>Alex Mwanje</h2>
            <p className={styles.empTitle}>Technical Operations Division</p>
            <div className={styles.empMeta}>
              <div className={styles.metaRow}><span>Employee ID</span><strong>NW-2023-458</strong></div>
              <div className={styles.metaRow}><span>Join Date</span><strong>March 12, 2023</strong></div>
              <div className={styles.metaRow}><span>Reporting To</span><strong>Sarah Naibasa</strong></div>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}><div className={styles.statVal}>4.8</div><div className={styles.statLbl}>PERFORMANCE</div></div>
              <div className={styles.stat}><div className={styles.statVal}>98%</div><div className={styles.statLbl}>ATTENDANCE</div></div>
              <div className={styles.stat}><div className={styles.statVal}>12</div><div className={styles.statLbl}>WARNINGS</div></div>
            </div>
          </div>

          {/* Leave Balances */}
          <div className={styles.leaveRow}>
            {[{label:'ANNUAL',val:14,color:'#005a9c'},{label:'SICK',val:'08',color:'#dc3545'},{label:'STUDY',val:'05',color:'#6c757d'}].map(l => (
              <div key={l.label} className={styles.leaveCard}>
                <div className={styles.leaveTag}>{l.label}</div>
                <div className={styles.leaveVal} style={{color:l.color}}>{l.val}</div>
                <div className={styles.leaveSub}>Days remaining</div>
                <div className={styles.leaveBar}><div className={styles.leaveBarFill} style={{width:`${(l.val/30)*100}%`,background:l.color}}/></div>
              </div>
            ))}
          </div>

          <div className={styles.bottomCards}>
            <div className={styles.payslipCard}>
              <div className={styles.payslipIcon}>📄</div>
              <div>
                <div className={styles.payslipTitle}>October 2023 Payslip</div>
                <div className={styles.payslipStatus}>Status: Processed</div>
              </div>
              <button className={styles.downloadBtn}>⬇</button>
            </div>
            <div className={styles.holidayCard}>
              <div className={styles.holidayDate}><div className={styles.hdNum}>09</div><div className={styles.hdMon}>OCT</div></div>
              <div><div className={styles.holidayName}>Independence Day</div><div className={styles.holidaySub}>Next Public Holiday</div></div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          {/* Task List */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span>Personal Task List</span>
             <button 
  className={styles.addBtn} 
  onClick={() => console.log("Add Task clicked")}
>
  <FiPlus /> Add Task
</button>

            </div>
            {tasks.map(t => (
              <div key={t.id} className={`${styles.taskRow} ${t.done ? styles.taskDone : ''}`}>
                <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} className={styles.taskCheck}/>
                <div>
                  <div className={styles.taskText}>{t.text}</div>
                  <div className={styles.taskDue}>{t.due}</div>
                </div>
                <FiMoreVertical className={styles.moreIcon}/>
              </div>
            ))}
          </div>

          {/* HR Support */}
          <div className={styles.supportCard}>
            <div className={styles.supportTitle}>Need HR Support?</div>
            <p className={styles.supportSub}>Our dedicated HR support team is available 8:00 AM - 5:00 PM EAT to assist you.</p>
            <button className={styles.chatBtn}><FiMessageSquare /> Chat with HR</button>
          </div>

          {/* Quick Resources */}
          <div className={styles.card}>
            <div className={styles.cardHeader}><span>Quick Resources</span></div>
            <div className={styles.resourceGrid}>
              {['HR Policy','Health Plan','Claims','KPAs'].map(r => (
                <button key={r} className={styles.resourceBtn}>📄 {r}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        © 2023 National Water and Sewerage Corporation. All rights reserved. &nbsp;
        <a href="/privacy">Privacy Policy</a> &nbsp; <a href="/terms">Terms of Service</a> &nbsp; <a href="/system">System Status</a>
      </div>
    </DashboardLayout>
  );
}
