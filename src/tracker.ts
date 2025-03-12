// src/tracker.ts
import type { User, Workout } from './types';

const users: User[] = [];
const workouts: Record<string, Workout[]> = {};

export function addUser(id: string, name: string, age: number, weight: number, height: number): void {
  if (users.find((user) => user.id === id)) {
    throw new Error('User with this ID already exists.');
  }
  users.push({ id, name, age, weight, height });
}

export function logWorkout(userId: string, workout: Workout): void {
  if (!users.find((user) => user.id === userId)) {
    throw new Error('User not found.');
  }
  if (!workouts[userId]) {
    workouts[userId] = [];
  }
  workouts[userId].push(workout);
}

export function getAllWorkoutsOf(userId: string): Workout[] {
  if (!workouts[userId]) {
    throw new Error('No workouts found for this user.');
  }
  return workouts[userId];
}

export function getAllWorkoutsByType(userId: string, type: string): Workout[] {
  if (!workouts[userId]) {
    throw new Error('No workouts found for this user.');
  }
  return workouts[userId].filter((workout) => workout.type.toLowerCase() === type.toLowerCase());
}

export function getUsers(): User[] {
  return users;
}

export function getUser(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error('User not found.');
  }
  Object.assign(user, updatedFields);
}
