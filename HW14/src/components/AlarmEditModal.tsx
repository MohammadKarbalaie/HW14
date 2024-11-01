import React, { useState } from 'react';  
import { AlarmWithId } from './types';  

interface AlarmEditModalProps {  
    isOpen: boolean;  
    alarm: AlarmWithId | null;  
    onClose: () => void;  
    onSave: (updatedAlarm: AlarmWithId) => void;  
}  

const AlarmEditModal: React.FC<AlarmEditModalProps> = ({ isOpen, alarm, onClose, onSave }) => {  
     
    const [title, setTitle] = useState<string>(alarm ? alarm.title : '');  
    const [description, setDescription] = useState<string>(alarm ? alarm.description : '');  

    if (!isOpen) return null;  

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault();  
        if (!title || !description) return;  

        onSave({ ...alarm!, title, description });  
        onClose();  
    };  

    return (  
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">  
            <div className="bg-white p-6 rounded shadow-md">  
                <h2 className="text-lg mb-4"><i className='fas fa-stopwatch mr-2 text-red-600'></i>Edit Alarm</h2>  
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>  
                    <input  
                        type="text"  
                        value={title}  
                        onChange={(e) => setTitle(e.target.value)}  
                        placeholder="Enter the alarm title"  
                        required  
                        className="mb-2 border rounded p-2"  
                    />  
                    <input  
                        type="text"  
                        value={description}  
                        onChange={(e) => setDescription(e.target.value)}  
                        placeholder="Enter the alarm description"  
                        required  
                        className="mb-2 border rounded p-2"  
                    />  
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">  
                        Save  
                    </button>  
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded ">  
                        Cancel  
                    </button>  
                </form>  
            </div>  
        </div>  
    );  
};  

export default AlarmEditModal;