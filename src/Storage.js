class Storage{
   static getCalorieLimit(defaultLimit = 2000){
         let calorieLimit;
         if(localStorage.getItem('calorieLimit') === null){
               calorieLimit = defaultLimit;
         }
         else {
               calorieLimit = parseFloat(localStorage.getItem('calorieLimit'));
         }
         return calorieLimit;
   }
   static setCalorieLimit(calorieLimit){
         localStorage.setItem('calorieLimit',calorieLimit);
   }

   static getTotalCalories(defaultCalories = 0){
         let totalCalories ;
         if(localStorage.getItem('totalCalories') === null){
               totalCalories = defaultCalories;
         }
         else {
               totalCalories = parseFloat(localStorage.getItem('totalCalories'));
         }
         return totalCalories;
   }
   static updateTotalCalories(totalCalories){
         localStorage.setItem('totalCalories', totalCalories);
   }

   static getMeals(){
         let meals;
         if(localStorage.getItem('meals') === null){
               meals = [];
         }
         else {
               meals = JSON.parse(localStorage.getItem('meals'));
         }
         return meals;
   }
   static saveMeal(meal){
         const meals = Storage.getMeals();
         meals.push(meal);
         localStorage.setItem('meals',JSON.stringify(meals));
   }
   static removeMeal(id){
         const meals = Storage.getMeals();
         meals.forEach((meal,index) =>{
               if(meal.id === id){
                     meals.splice(index,1);
               }
         });
         localStorage.setItem('meals',JSON.stringify(meals));
   }

   static getWorkouts(){
         let workouts;
         if(localStorage.getItem('workouts') === null){
               workouts = [];
         }
         else {
               workouts = JSON.parse(localStorage.getItem('workouts'));
         }
         return workouts;
   }
   static saveWorkout(workout){
         const workouts = Storage.getWorkouts();
         workouts.push(workout);
         localStorage.setItem('workouts',JSON.stringify(workouts));
   }
   static removeWorkout(id){
         const workouts = Storage.getWorkouts();
         workouts.forEach((workout,index) =>{
               if(workout.id === id){
                     workouts.splice(workout,1);
               }
         });
         localStorage.setItem('workouts',JSON.stringify(workouts));
   }

   static resetAll(){
         localStorage.removeItem('totalCalories');
         localStorage.removeItem('meals');
         localStorage.removeItem('workouts');

         // if we want to reset all 
         // localStorage.clear();
   }
}

// Storage.updateTotalCalories(500)
// console.log(Storage.getTotalCalories());
// Storage.setCalorieLimit(3000);
// console.log(Storage.getCalorieLimit());
// const meal = new Meal('rice',400);
// const jmeal = JSON.stringify(meal);
// const nmeal = JSON.parse(jmeal);
// console.log(nmeal);
// Storage.saveMeal(meal);
// console.log(Storage.getMeals());

export default Storage;