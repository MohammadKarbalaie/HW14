import React, { useEffect, useState, useRef } from 'react';  
import AlarmForm from './AlarmForm';  
import AlarmList from './AlarmList';  
import AlarmModal from './AlarmModal';  
import { Alarm } from './types';  

const R_Alarm: React.FC = () => {  
    const [alarms, setAlarms] = useState<Alarm[]>(() => JSON.parse(localStorage.getItem('alarms') || '[]'));  
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  
    const [currentAlarm, setCurrentAlarm] = useState<Alarm | null>(null);  
    const audioRef = useRef<HTMLAudioElement>(new Audio('/path/to/alarm-sound.mp3'));  

    useEffect(() => {  
        localStorage.setItem('alarms', JSON.stringify(alarms));  

        const interval = setInterval(() => {  
            const now = new Date();  
            alarms.forEach((alarm) => {  
                const alarmTime = new Date(`${now.toDateString()} ${alarm.time}`);  
                if (alarmTime <= now && !currentAlarm) {  
                    setCurrentAlarm(alarm);  
                    audioRef.current.play();  
                    setIsModalOpen(true);  
                }  
            });  
        }, 1000);  

        return () => clearInterval(interval);  
    }, [alarms, currentAlarm]);  

    const addAlarm = (alarm: Alarm) => {  
        setAlarms((prevAlarms) => [...prevAlarms, alarm]);  
    };  

    const dismissAlarm = () => {  
        setCurrentAlarm(null);  
        audioRef.current.pause();  
        audioRef.current.currentTime = 0; // Reset audio  
    };  

    const deleteAlarm = (index: number) => {  
        const newAlarms = alarms.filter((_, i) => i !== index);  
        setAlarms(newAlarms);  
    };  

    const editAlarm = (alarm: Alarm) => {  
        console.log('ویرایش آلارم:', alarm);  
    };  

    const triggerAlarm = (alarm: Alarm) => {  
        setCurrentAlarm(alarm);  
        audioRef.current.play();  
        setIsModalOpen(true);  
    };  

    return (  
        <div className='flex flex-col items-center my-0 p-8 text-center'>  
            <i className='fas fa-circle-dot top-[66px] absolute text-white text-sm'></i>
            <h1 className='bg-slate-600 px-4 py-2 pt-4 text-white font-semibold text-xl rounded-tl-xl rounded-tr-xl'>Alarm App</h1>  
            <AlarmForm onAddAlarm={addAlarm} />  
            <AlarmList  
                alarms={alarms}  
                onDelete={deleteAlarm}  
                onEdit={editAlarm}  
                onTrigger={triggerAlarm}  
            />  
            <AlarmModal  
                isOpen={isModalOpen}  
                alarm={currentAlarm}   
                onClose={() => setIsModalOpen(false)}  
                onDismiss={dismissAlarm}  
            />  
        </div>  
    );  
};  

export default R_Alarm;