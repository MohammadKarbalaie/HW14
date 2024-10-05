import React, { useState } from 'react';
import { AlarmWithId } from './types';

interface AlarmListProps {
  alarms: AlarmWithId[];
  onEdit: (alarm: AlarmWithId) => void;
  onDelete: (index: number) => void;
  onTrigger: (alarm: AlarmWithId) => void;
}

const AlarmList: React.FC<AlarmListProps> = ({ alarms, onEdit, onDelete, onTrigger }) => {
  const [sortBy, setSortBy] = useState<'time' | 'title'>('time');

  const sortedAlarms = [...alarms].sort((a, b) => {
    if (sortBy === 'time') {
      return a.time.localeCompare(b.time);
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div>
      <div className="flex justify-start mb-4">
        <button onClick={() => setSortBy('time')} className={`mr-2 ${sortBy === 'time' ? 'font-bold' : ''}`}> <i className='fas fa-sort'></i> Time</button>
        <button onClick={() => setSortBy('title')} className={`${sortBy === 'title' ? 'font-bold ' : ''} `}><i className='fas fa-sort'></i> Title</button>
      </div>
      {sortedAlarms.map((alarm, index) => (
        <div key={index} className="flex justify-between items-center border bg-slate-400 uppercase text-white px-3 py-3 mb-2 rounded-lg shadow-slate-900 shadow-2xl">
          <span>{alarm.title} - {alarm.time}</span>
          <div>
            <button onClick={() => onEdit(alarm)} className="bg-blue-500 text-white mr-2 ml-4 px-4 py-2 rounded-lg">Edit</button>
            <button onClick={() => onDelete(index)} className="bg-red-500 text-white mr-2 ml-2 px-4 py-2 rounded-lg">Delete</button>
            <button onClick={() => onTrigger(alarm)} className="bg-green-500 text-white mr-2 ml-2 px-4 py-2 rounded-lg">Active</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlarmList;
