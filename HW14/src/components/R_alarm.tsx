import React, { useEffect, useState, useRef } from 'react';
import AlarmForm from './AlarmForm';
import AlarmList from './AlarmList';
import AlarmModal from './AlarmModal';
import { AlarmWithId, AlarmWithouId } from './types';
import AlarmEditModal from './AlarmEditModal';

const R_Alarm: React.FC = () => {
    const [alarms, setAlarms] = useState<AlarmWithId[]>(() => JSON.parse(localStorage.getItem('alarms') || '[]'));
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [currentAlarm, setCurrentAlarm] = useState<AlarmWithId | null>(null);
    const audioRef = useRef<HTMLAudioElement>(new Audio('/public/alarm-sound.mp3'));
    const [isAlarmActive, setIsAlarmActive] = useState(false);
    const [repeatAlarm, setRepeatAlarm] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem('alarms', JSON.stringify(alarms));

        const interval = setInterval(() => {
            const now = new Date();
            alarms.forEach((alarm) => {
                const alarmTime = new Date(`${now.toDateString()} ${alarm.time}`);
                if (alarmTime <= now && !isAlarmActive && alarm.isActive) {
                    console.log("Alarm triggered:", alarm);
                    setCurrentAlarm(alarm);
                    setIsModalOpen(true);
                    setIsAlarmActive(true);
                    setRepeatAlarm(true); 
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [alarms, isAlarmActive]);

    useEffect(() => {
        if (repeatAlarm) {
            const playSound = () => {
                if (audioRef.current) {
                    audioRef.current.currentTime = 0; 
                    audioRef.current.play().catch(error => {
                        console.error("Error playing audio:", error);
                    });
                }
            };
            playSound(); 
            const repeatInterval = setInterval(playSound, 1000); 

            return () => clearInterval(repeatInterval);
        }
    }, [repeatAlarm]);

    const dismissAlarm = () => {
        console.log("Dismiss Alarm called");
        if (currentAlarm) {
            setAlarms((prevAlarms) =>
                prevAlarms.map((alarm) =>
                    alarm.id === currentAlarm.id ? { ...alarm, isActive: false } : alarm
                )
            );
        }
        setCurrentAlarm(null);
        setIsModalOpen(false);
        setIsAlarmActive(false);
        setRepeatAlarm(false); // Stop repeating sound
        if (audioRef.current) {
            audioRef.current.pause(); // stop sound
            audioRef.current.currentTime = 0; 
        }
    };

    const extendAlarm = () => {
        console.log("Extend Alarm called");
        if (currentAlarm) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setIsModalOpen(false);
            setIsAlarmActive(false);
            setRepeatAlarm(false);

            const extendedTime = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 
            const newTimeString = extendedTime.toTimeString().slice(0, 5); // "HH:mm"

            setAlarms((prevAlarms) =>
                prevAlarms.map((alarm) =>
                    alarm.id === currentAlarm.id ? { ...alarm, time: newTimeString, isActive: true } : alarm
                )
            );

            console.log("Alarm extended for 5 minutes:", newTimeString);
        }
    };

    const addAlarm = (alarm: AlarmWithouId) => {
        setAlarms((prevAlarms) => [...prevAlarms, { ...alarm, id: Date.now(), isActive: true }]);
    };

    const deleteAlarm = (index: number) => {
        const newAlarms = alarms.filter((_, i) => i !== index);
        setAlarms(newAlarms);
    };

    const openEditModal = (alarm: AlarmWithId) => {
        setCurrentAlarm(alarm);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentAlarm(null);
    };

    const saveUpdatedAlarm = (updatedAlarm: AlarmWithId) => {
        setAlarms((prevAlarms) =>
            prevAlarms.map((alarm) => (alarm.id === updatedAlarm.id ? updatedAlarm : alarm))
        );
        closeEditModal();
    };

    return (
        <div className='flex flex-col items-center my-0 p-8 text-center'>
            <h1 className='bg-slate-600 px-4 py-2 pt-4 text-white font-semibold text-xl rounded-tl-xl rounded-tr-xl'>Alarm App</h1>
            <AlarmForm onAddAlarm={addAlarm} />
            <AlarmList
                alarms={alarms}
                onDelete={deleteAlarm}
                onEdit={openEditModal}
                onTrigger={(alarm) => {
                    setCurrentAlarm(alarm);
                    setIsModalOpen(true);
                }}
            />
            <AlarmModal
                isOpen={isModalOpen}
                alarm={currentAlarm}
                onClose={() => setIsModalOpen(false)}
                onDismiss={dismissAlarm} 
                onExtend={extendAlarm} 
                onDelete={() => {
                    if (currentAlarm) {
                        deleteAlarm(alarms.findIndex(a => a.id === currentAlarm.id));
                        dismissAlarm();
                    }
                }}
            />
            <AlarmEditModal
                isOpen={isEditModalOpen}
                alarm={currentAlarm}
                onClose={closeEditModal}
                onSave={saveUpdatedAlarm}
            />
        </div>
    );
};

export default R_Alarm;
