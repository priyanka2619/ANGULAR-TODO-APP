import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todos: Todo[] = []
  // showValidationErrors: boolean

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }


  onFormSubmit(form: NgForm){
    console.log("FORM SUBMITTED"),
    console.log(form)

    if(form.invalid) return console.log("Form is invalid")

    this.dataService.addTodo(new Todo(form.value.text))

    form.reset()
  }

  editTodo(todo: Todo){
    //We require:
    // - index of todo
    // - user need to enter new updated information

    const index = this.todos.indexOf(todo)

    //open dialog box of angular material
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '900px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.dataService.updateTodo(index, result)

      }
    })
  }

  deleteTodo(todo: Todo){

    const index = this.todos.indexOf(todo)

    this.dataService.deleteTodo(index)
  }
}
