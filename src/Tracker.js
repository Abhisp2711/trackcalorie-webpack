import Storage from './Storage';
import capitalizeFirst from './capitalizeFirst';

class calorieTracker {
   constructor(){
         this._calorieLimit = Storage.getCalorieLimit();
         this._totalCalories = Storage.getTotalCalories();
         this._meals = Storage.getMeals();
         this._workout = Storage.getWorkouts();

         this._displayTotalCalories();
         this._displayCalorieLimit();
         this._displayCaloriesConsumed();
         this._displayCaloriBurned();
         this._displayCaloriesRemaining();
         this._displayCalorieBar();

         document.getElementById('limit').value = this._calorieLimit;
   }

   //Public method/API
   addMeal(meal){
         this._meals.push(meal);
         this._totalCalories += meal.calories;
         Storage.updateTotalCalories(this._totalCalories);
         Storage.saveMeal(meal);
         this._displayNewMeal(meal);
         this._render();
   }
   addWorkout(workout){ 
         this._workout.push(workout);
         this._totalCalories -= workout.calories;
         Storage.updateTotalCalories(this._totalCalories);
         Storage.saveWorkout(workout);
         this._displayNewWorkout(workout);
         this._render();
   }
   removeMeal(id){
         const index = this._meals.findIndex((meal) => meal.id === id);
         if(index !== -1){
               const meal = this._meals[index];
               this._totalCalories -= meal.calories;
               Storage.updateTotalCalories(this._totalCalories);
               Storage.removeMeal(id);
               this._meals.splice(index,1);
               this._render();
         }
   }
   removeWorkout(id){
         const index = this._workout.findIndex((workout)=>workout.id === id);
         if(index !== -1){
               const workout = this._workout[index];
               this._totalCalories += workout.calories;
               Storage.updateTotalCalories(this._totalCalories);
               Storage.removeWorkout(id);
               this._workout.splice(index,1);
               this._render();
         }
   }
   resetDay(){
         this._totalCalories = 0;
         Storage.updateTotalCalories(this._totalCalories);
         Storage.resetAll();
         this._meals = [];
         this._workout = [];
         this._render();
   }
   setLimit(limit){
         this._calorieLimit = limit;
         Storage.setCalorieLimit(limit);
         this._displayCalorieLimit();
         this._render();
   }
   loadItems(){
         this._meals.forEach(meal =>{this._displayNewMeal(meal)});
         this._workout.forEach(workout =>{this._displayNewWorkout(workout)});
   }


   // Private method
   _displayTotalCalories(){
         const TotalCalories = document.getElementById('calories-total');
         TotalCalories.innerHTML = this._totalCalories;
   }

   _displayCalorieLimit(){
         const CalorieLImit = document.getElementById('calories-limit');
         CalorieLImit.innerHTML = this._calorieLimit;
   }
   _displayCaloriesConsumed(){
         const CalorieConsumed = document.getElementById('calories-consumed');
         const consumed = this._meals.reduce((total,meal)=>total+meal.calories,0);
         CalorieConsumed.innerHTML = consumed;
   }
   _displayCaloriBurned(){
         const CalorieBurnEl = document.getElementById('calories-burned');
         const burned = this._workout.reduce((total,workout)=>total+workout.calories,0);
         CalorieBurnEl.innerHTML = burned;
   }
   _displayCaloriesRemaining(){
         const calorieRemainingEl = document.getElementById('calories-remaining');
         const progressBar = document.getElementById('calorie-progress');
         const remain = this._calorieLimit - this._totalCalories;

         calorieRemainingEl.innerHTML = remain;
         if(remain <= 0){
               calorieRemainingEl.parentElement.parentElement.classList.remove('bg-light');
               calorieRemainingEl.parentElement.parentElement.classList.add('bg-danger');

               progressBar.classList.remove('bg-success');
               progressBar.classList.add('bg-danger');
         }
         else{
               calorieRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
               calorieRemainingEl.parentElement.parentElement.classList.add('bg-light')

               progressBar.classList.remove('bg-danger');
               progressBar.classList.add('bg-sucess');
         }
   }
   _displayCalorieBar(){
         const calorieBarEl = document.getElementById('calorie-progress');
         const percentage = (this._totalCalories/this._calorieLimit)*100;
         const width = Math.min(percentage,100);
         calorieBarEl.style.width = `${width}%`; 
   }

   _displayNewMeal(meal){
         const mealsEl = document.getElementById('meal-items');
         const mealEl = document.createElement('div');
         mealEl.classList.add('card','my-2');
         mealEl.setAttribute('data-id',meal.id);
         mealEl.innerHTML = `
         <div class="card-body">
             <div class="d-flex align-items-center justify-content-between">
               <h4 class="mx-1">${capitalizeFirst(meal.name)}</h4>
               <div
                 class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
               >
                 ${meal.calories}
               </div>
               <button class="delete btn btn-danger btn-sm mx-2">
                 <i class="fa-solid fa-xmark"></i>
               </button>
             </div>
           </div>`
         mealsEl.appendChild(mealEl);
   }
   _displayNewWorkout(workout){
         const workoutsEl = document.getElementById('workout-items');
         const workoutEl = document.createElement('div');
         workoutEl.classList.add('card','my-2');
         workoutEl.setAttribute('data-id',workout.id);
         workoutEl.innerHTML = `
         <div class="card-body">
             <div class="d-flex align-items-center justify-content-between">
               <h4 class="mx-1">${capitalizeFirst(workout.name)}</h4>
               <div
                 class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
               >
                 ${workout.calories}
               </div>
               <button class="delete btn btn-danger btn-sm mx-2">
                 <i class="fa-solid fa-xmark"></i>
               </button>
             </div>
           </div>`
         workoutsEl.appendChild(workoutEl);
   }


   _render(){
         this._displayTotalCalories();
         this._displayCaloriesConsumed();
         this._displayCaloriBurned();
         this._displayCaloriesRemaining();
         this._displayCalorieBar();
   }
}

export default calorieTracker;
