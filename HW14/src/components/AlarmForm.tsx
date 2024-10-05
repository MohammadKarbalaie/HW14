import React, { useState, useEffect } from 'react';
import { AlarmWithouId } from './types';

interface AlarmFormProps {
  onAddAlarm: (alarm: AlarmWithouId) => void;
}

const AlarmForm: React.FC<AlarmFormProps> = ({ onAddAlarm }) => {
  const [time, setTime] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    // اعتبارسنجی فرم: اگر همه فیلدها پر شده باشند
    setIsFormValid(time !== '' && title !== '' && description !== '');
  }, [time, title, description]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isFormValid) {
      onAddAlarm({ time, title, description });
      setTime('');
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-96 w-full flex flex-col items-center mb-4 bg-slate-600 gap-2 rounded-3xl py-10 shadow-2xl">
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        className={`mb-2 border px-[118px] py-2 rounded-3xl ${time === '' ? 'border-red-500' : ''}`}
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the alarm title."
        required
        className={`mb-2 border px-20 py-2 rounded-3xl ${title === '' ? 'border-red-500' : ''}`}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter the alarm description."
        required
        className={`mb-2 border px-20 py-2 rounded-3xl ${description === '' ? 'border-red-500' : ''}`}
      />
      <button
        type="submit"
        disabled={!isFormValid}
        className={`bg-blue-500 text-white px-4 py-3 rounded-xl ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <i className='fas fa-clock mr-2'></i>Add Alarm
      </button>
    </form>
  );
};

export default AlarmForm;
