import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() search = new EventEmitter<boolean>();
  searchForm = new FormGroup({
    searchText: new FormControl('', [Validators.required]),
  });

  onSearch() {
    this.search.emit(this.searchForm.get('searchText').value);
  }
}
