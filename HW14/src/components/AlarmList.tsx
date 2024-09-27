import React from 'react';  
import { Alarm } from './types';

interface AlarmListProps {  
  alarms: Alarm[];  
  onEdit: (alarm: Alarm) => void;  
  onDelete: (index: number) => void;  
  onTrigger: (alarm: Alarm) => void;  
}  

const AlarmList: React.FC<AlarmListProps> = ({ alarms, onEdit, onDelete, onTrigger }) => {  
  return (  
    <div>  
      {alarms.map((alarm, index) => (  
        <div key={index} className="flex justify-between items-center border p-2 mb-2 rounded-lg">  
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