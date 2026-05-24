import { TopNav } from '@/components/top-nav';
import { BackLink } from '@/components/back-link';
import { jobQueue, scheduleBlocks, staffLanes } from '@/lib/scheduling/mock-data';

const hours = Array.from({ length: 11 }, (_, i) => i + 6);

export default function SchedulePage() {
  return (
    <>
      <TopNav />
    <main className="schedule-page">
      <BackLink href="/dashboard" label="Back to dashboard" />
      <div className="schedule-toolbar">
        <div className="left">
          <button type="button" className="ghost-btn">Today</button>
          <button type="button" className="ghost-btn">Day</button>
          <button type="button" className="ghost-btn">Week</button>
        </div>
        <h1>Schedule</h1>
        <div className="right">
          <button type="button" className="form-btn">+ New Booking</button>
        </div>
      </div>

      <section className="scheduler-shell">
        <aside className="staff-col">
          <h2>Staff</h2>
          {staffLanes.map((lane) => (
            <div className="staff-row" key={lane.id}>
              <span className="avatar">{lane.initials}</span>
              <span>{lane.name}</span>
            </div>
          ))}
        </aside>

        <div className="grid-col">
          <div className="time-header">
            {hours.map((h) => (
              <div key={h}>{h}:00</div>
            ))}
          </div>

          <div className="rows-wrap">
            {staffLanes.map((lane) => (
              <div key={lane.id} className="lane">
                {hours.map((h) => (
                  <div key={h} className="cell" />
                ))}
                {scheduleBlocks
                  .filter((block) => block.staffId === lane.id)
                  .map((block) => (
                    <article
                      key={block.id}
                      className="block"
                      style={{
                        left: `${((block.startHour - 6) / hours.length) * 100}%`,
                        width: `${((block.endHour - block.startHour) / hours.length) * 100}%`
                      }}
                    >
                      <strong>{block.title}</strong>
                      <p>{block.subtitle}</p>
                    </article>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <aside className="jobs-col">
          <h2>Jobs</h2>
          <input placeholder="Search jobs" type="search" />
          <div className="job-list">
            {jobQueue.map((job) => (
              <article className="job-card" key={job.id}>
                <strong>{job.code} {job.title}</strong>
                <p>{job.address}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
    </>
  );
}
