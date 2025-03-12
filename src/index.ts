// src/index.ts
import * as readline from 'readline';
import {
  addUser,
  logWorkout,
  getAllWorkoutsOf,
  getAllWorkoutsByType,
  getUsers,
  getUser,
  updateUser
} from './tracker';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\nFitness Tracker');
  console.log('1. Add User');
  console.log('2. Log Workout');
  console.log('3. Get All Workouts of User');
  console.log('4. Get Workouts by Type');
  console.log('5. Get All Users');
  console.log('6. Get User Details');
  console.log('7. Update User');
  console.log('8. Exit');
}

function promptUser() {
  showMenu();
  rl.question('Choose an option: ', (option) => {
    switch (option) {
      case '1':
        rl.question('Enter user details (id,name,age,weight,height): ', (input) => {
          const [id, name, age, weight, height] = input.split(',');
          try {
            addUser(id, name, Number(age), Number(weight), Number(height));
            console.log('User added successfully!');
          } catch (error) {
            console.error((error as Error).message);
          }
          promptUser();
        });
        break;

      case '2':
        rl.question('Enter workout details (userId,type,duration,calories): ', (input) => {
          const [userId, type, duration, caloriesBurned] = input.split(',');
          try {
            logWorkout(userId, {
              type,
              duration: Number(duration),
              caloriesBurned: Number(caloriesBurned)
            });
            console.log('Workout logged successfully!');
          } catch (error) {
            console.error((error as Error).message);
          }
          promptUser();
        });
        break;

      case '3':
        rl.question('Enter user ID: ', (userId) => {
          try {
            console.log(getAllWorkoutsOf(userId));
          } catch (error) {
            console.error((error as Error).message);
          }
          promptUser();
        });
        break;

      case '4':
        rl.question('Enter user ID and workout type: ', (input) => {
          const [userId, type] = input.split(',');
          try {
            console.log(getAllWorkoutsByType(userId, type));
          } catch (error) {
            console.error((error as Error).message);
          }
          promptUser();
        });
        break;

      case '5':
        console.log(getUsers());
        promptUser();
        break;

      case '6':
        rl.question('Enter user ID: ', (id) => {
          const user = getUser(id);
          if (user) {
            console.log(user);
          } else {
            console.log('User not found.');
          }
          promptUser();
        });
        break;

      case '7':
        rl.question('Enter user ID and updated details (name,age,weight,height): ', (input) => {
          const [id, name, age, weight, height] = input.split(',');
          try {
            updateUser(id, {
              name,
              age: Number(age),
              weight: Number(weight),
              height: Number(height)
            });
            console.log('User updated successfully!');
          } catch (error) {
            console.error((error as Error).message);
          }
          promptUser();
        });
        break;

      case '8':
        rl.close();
        break;

      default:
        console.log('Invalid option. Try again.');
        promptUser();
    }
  });
}

promptUser();
