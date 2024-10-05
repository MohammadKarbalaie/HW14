export interface AlarmWithId {  
    id?:number
    time: string;  
    title: string;       
    description: string;  
  }

  export interface AlarmWithouId {  
    time: string;  
    title: string;       
    description: string;  
  }

  export interface AlarmWithouId {
      title: string;
      time: string;
      isActive: boolean; 
      }
  
  export interface AlarmWithId extends AlarmWithouId {
      id?: number;
  }