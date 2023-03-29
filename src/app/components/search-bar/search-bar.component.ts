import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit  {

  @Output() searchTerm: EventEmitter<string> = new EventEmitter();

  searchProduct = new FormControl('');

  ngOnInit() {
    this.searchProduct.valueChanges.pipe(debounceTime(300)).subscribe(value => this.searchTerm.emit(value))
  }

  constructor() { }  

}
