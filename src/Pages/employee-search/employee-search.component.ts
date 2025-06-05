import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-employee-search',
  imports: [MatInputModule,MatFormFieldModule,MatIconModule],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent implements OnInit{

    @Output() search = new EventEmitter<string>();
    private searchSubject = new Subject<string>();

  ngOnInit(): void {
     this.searchSubject
      .pipe(debounceTime(300))  // Optional: adds a delay to reduce rapid firing
      .subscribe((value) => {
        console.log('v',value)
        this.search.emit(value); 
      });
  }
onEmpSearch(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  console.log('Search:', value);
  this.searchSubject.next(value)
}
}
