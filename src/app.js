import '@fortawesome/fontawesome-free/js/all';
import {Modal,Collapse} from 'bootstrap';

import calorieTracker from './Tracker';
import {Meal,Workout} from './Item';

import './css/style.css';
import './css/bootstrap.css';


class App {
   constructor(){
         this._tracker = new calorieTracker();
         this._loadEventListener();
         this._tracker.loadItems();
   }


   _loadEventListener(){
         document
               .getElementById('meal-form')
               .addEventListener('submit',this._newItem.bind(this,'meal'))
         document
               .getElementById('workout-form')
               .addEventListener('submit',this._newItem.bind(this,'workout'));
         document
               .getElementById('meal-items')
               .addEventListener('click',this._removeItem.bind(this,'meal'));
         document
               .getElementById('workout-items')
               .addEventListener('click',this._removeItem.bind(this,'workout'));
         document
               .getElementById('filter-meals')
               .addEventListener('keyup',this._filterItem.bind(this,'meal'));
         document
               .getElementById('filter-workouts')
               .addEventListener('keyup',this._filterItem.bind(this,'workout'));
         document
               .getElementById('reset')
               .addEventListener('click',this._reset.bind(this));
         document
               .getElementById('limit-form')
               .addEventListener('submit',this._setLimit.bind(this));
   }

   _newItem(type,e){
         e.preventDefault();
         const name = document.getElementById(`${type}-name`);
         const calories = document.getElementById(`${type}-calories`);
         


         //validate inputs
         if(name.value === '' || calories.value === ''){
               alert("Please fill all fields ");
               return;
         }

         if(type === 'meal'){
               const meal = new Meal(name.value,parseFloat(calories.value));
               this._tracker.addMeal(meal);
         }else{
               const workout = new Workout(name.value,parseFloat(calories.value));
               this._tracker.addWorkout(workout);
         }

         name.value = '';
         calories.value = '';

         const collapseItem = document.getElementById(`collapse-${type}`);
         const bsCollapse = new Collapse(collapseItem,{
               toggle: true,
         });
   }

   _removeItem(type,e){
         if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
               if(confirm("Are you sure !")){
                     const id = e.target.closest('.card').getAttribute('data-id');
                     type === 'meal'
                           ? this._tracker.removeMeal(id)
                           : this._tracker.removeWorkout(id);
               }
               e.target.closest('.card').remove();
               
         }
   }
   _filterItem(type,e){
         const text = e.target.value.toLowerCase();
         document.querySelectorAll(`#${type}-items .card`).forEach(item =>{
               const name = item.firstElementChild.firstElementChild.firstElementChild.textContent;
               if(name.toLowerCase().indexOf(text) !== -1){
                     item.style.display = 'block';
               }else{
                     item.style.display = 'none';
               }
         });
   }
   _reset(){
         this._tracker.resetDay();
         document.getElementById('meal-items').innerHTML = '';
         document.getElementById('workout-items').innerHTML = '';
         document.getElementById('filter-meals').value = '';
         document.getElementById('filter-workouts').value = '';
   }
   _setLimit(e){
         e.preventDefault();
         const limit = document.getElementById('limit');
         if(limit.value === ''){
               alert('Please add a Limit');
               return;
         }
          this._tracker.setLimit(parseFloat(limit.value));
          limit.value = ''

         const modalEl = document.getElementById('limit-modal');
         const modal = Modal.getInstance(modalEl);
         modal.hide();
   }
}

const app = new App();


// function for makig firsr letter capital


// const meal = new Meal('breakfast',400);
// const meal2 = new Meal('apple',200);

// app._tracker.addMeal(meal);
// app._tracker.addMeal(meal2);

// app._tracker._meals.forEach(meal =>{
//       console.log(meal);
// })
