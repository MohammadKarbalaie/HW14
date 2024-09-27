import React from 'react';  
import { Alarm } from './types';  

interface AlarmModalProps {  
    isOpen: boolean;  
    alarm: Alarm | null;  
    onClose: () => void;  
    onDismiss: () => void;  
}  

const AlarmModal: React.FC<AlarmModalProps> = ({ isOpen, alarm, onClose, onDismiss }) => {  
    if (!isOpen || !alarm) return null;  

    return (  
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">  
            <div className="bg-white p-6 rounded shadow-lg">  
                <h2 className="text-lg mb-4">آلارم فعال</h2>  
                <p>عنوان: {alarm.title}</p> {/* تغییر label به title */}  
                <p>زمان: {alarm.time}</p>  
                <p>توضیحات: {alarm.description}</p> {/* اضافه کردن description */}  
                <button onClick={onDismiss} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">خاموش کردن</button>  
                <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">بستن</button>  
            </div>  
        </div>  
    );  
};  

export default AlarmModal;