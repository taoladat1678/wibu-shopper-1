import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private searchService: SearchService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.searchForm.get('search')!.valueChanges
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged() // Only emit if value is different from previous value
      )
      .subscribe(value => {
        this.performSearch(value);
      });
  }

  performSearch(query: string) {
    if (query) {
      console.log('Search query:', query);
      this.searchService.searchProducts(query);
    }
  }

  onSearch() {
    const query = this.searchForm.get('search')!.value;
    this.performSearch(query);
  }
}
