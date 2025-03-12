// src/types.ts
export interface User {
    id: string;
    name: string;
    age: number;
    weight: number;
    height: number;
  }
  
  export interface Workout {
    type: string;
    duration: number; // in minutes
    caloriesBurned: number;
  }
  