import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.css"],
})
export class IconsComponent implements OnInit {
  todos: any[] = [];
  todoForm: FormGroup;
  currentPage: number = 1;
  itemsPerPage: number | "all" = 5; // Updated to allow "all"
  totalPages: number = 1;
  sortDirection: string = "asc"; // Default sort direction
  sortField: string = "id"; // Default sort field

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ["", Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    const startIndex = (this.currentPage - 1) * +this.itemsPerPage;
    const endIndex = startIndex + +this.itemsPerPage;

    const url = "https://jsonplaceholder.typicode.com/todos";
    this.http.get(url).subscribe((response: any[]) => {
      if (this.itemsPerPage === "all") {
        this.todos = response;
        this.totalPages = 1; // All items, so only one page
      } else {
        this.todos = response.slice(startIndex, endIndex);
        this.totalPages = Math.ceil(response.length / +this.itemsPerPage);
      }
    });
  }

  createTodo() {
    if (this.todoForm.valid) {
      this.http
        .post("https://jsonplaceholder.typicode.com/todos", this.todoForm.value)
        .subscribe((response: any) => {
          this.todos.push(response);
          this.todoForm.reset();
        });
    } else {
      this.markFieldsAsTouched();
    }
  }

  markFieldsAsTouched() {
    Object.keys(this.todoForm.controls).forEach((field) => {
      const control = this.todoForm.get(field);
      control?.markAsTouched();
    });
  }

  deleteTodo(id: number) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchTodos();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchTodos();
    }
  }

  changeItemsPerPage() {
    this.currentPage = 1; // Reset page when changing itemsPerPage
    this.fetchTodos();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.fetchTodos();
  }

  sortTable(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortField = field;
      this.sortDirection = "asc";
    }

    this.todos.sort((a, b) => {
      if (this.sortDirection === "asc") {
        return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      } else {
        return b[field] < a[field] ? -1 : b[field] > a[field] ? 1 : 0;
      }
    });
  }
}
