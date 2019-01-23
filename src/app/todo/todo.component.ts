import { Response } from '@angular/http';
import { TodoService } from '../services/todo.services';
import ToDo from '../models/todo.models';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  
  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private todoService: TodoService
  ) { }

  //Declaring the new todo Object and initilizing it
  public newTodo: ToDo = new ToDo()

  //An Empty list for the visible todo list
  //instatiates an empty array to allow methods to have aa holding 
  todosList: ToDo[];
  editTodos: ToDo[] = []; // the equals [] 
  

//calls the service ask the service for the todos
  ngOnInit(): void {

    //At component initialization the 
    this.todoService.getToDos()
      .subscribe(todos => {
        //assign the todolist property to the proper http response
        this.todosList = todos
        console.log(todos)
      })
  }

  //This method will get called on Create button event
  
  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res.data)
        this.newTodo = new ToDo() /// this allows the new todo in form to clear the fields
      })
  }

  //edit function
  editTodo(todo: ToDo) {
    console.log(todo)//debug code line to see values
     if(this.todosList.includes(todo)){ // is this a todo retrieved from the api
      if(!this.editTodos.includes(todo)){ //is this in the list to be edited
        this.editTodos.push(todo) //if not in the list add to edit list
      }else{
        this.editTodos.splice(this.editTodos.indexOf(todo), 1)// remove this element from the array get the right todos
        this.todoService.editTodo(todo).subscribe(res => { // call to service
          console.log('Update Succesful')
         }, err => {
            //this.editTodo(todo)
            console.error('Update Unsuccesful')
          })
        }
      }
    }
//updating the status to complete change status to done
    doneTodo(todo:ToDo){
      todo.status = 'Done'
      this.todoService.editTodo(todo).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        //this.editTodo(todo)
        console.error('Update Unsuccesful')
      })
    }

    //listening for the enter key event if selected edit todo field
    submitTodo(event, todo:ToDo){
      if(event.keyCode ==13){ // keycode ==13 is the enter key
        this.editTodo(todo)
      }
    }

    //delete function
    deleteTodo(todo: ToDo) {
      this.todoService.deleteTodo(todo._id).subscribe(res => {
        this.todosList.splice(this.todosList.indexOf(todo), 1);
        //betterway can ask api for the list
      })
    }

}






