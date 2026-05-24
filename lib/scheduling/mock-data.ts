export type StaffLane = { id: string; initials: string; name: string };

export type ScheduleBlock = {
  id: string;
  staffId: string;
  startHour: number;
  endHour: number;
  title: string;
  subtitle: string;
};

export type JobQueueItem = {
  id: string;
  code: string;
  title: string;
  address: string;
  assignee?: string;
};

export const staffLanes: StaffLane[] = [
  { id: 'unassigned', initials: 'U', name: 'Unassigned' },
  { id: 's1', initials: 'DM', name: 'Derek McQuarrie' },
  { id: 's2', initials: 'GH', name: 'Guido Hatzis' },
  { id: 's3', initials: 'IT', name: 'Iro Teiti' },
  { id: 's4', initials: 'LW', name: 'Levi Wilson' }
];

export const scheduleBlocks: ScheduleBlock[] = [
  {
    id: 'a1',
    staffId: 's3',
    startHour: 8,
    endHour: 14,
    title: 'PLU-9231a Iro\'s hours',
    subtitle: 'House Me Limited'
  },
  {
    id: 'a2',
    staffId: 's2',
    startHour: 10,
    endHour: 12,
    title: 'PLU-8572b Office fitout',
    subtitle: 'Plumbed Up Ltd'
  }
];

export const jobQueue: JobQueueItem[] = [
  { id: 'j1', code: 'PLU-10588a', title: '51 Lincoln Park Ave', address: 'Massey, Auckland', assignee: 'P' },
  { id: 'j2', code: 'PLU-10617a', title: 'F215', address: 'Takanini', assignee: 'GH' },
  { id: 'j3', code: 'PLU-10616a', title: 'F105', address: 'Takanini' },
  { id: 'j4', code: 'PLU-10615a', title: 'Issue with hot water', address: 'Mt Roskill' }
];
