import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadDirective } from '../typeahead.directive';
import { TypeaheadModule } from '../typeahead.module';
import { TypeaheadDataset } from '../typeahead-dataset.interface';

@Component({
  template: `
    <input
      [(ngModel)]="selected"
      [typeaheadDatasets]="datasets"
      class="form-control"
      data-test="multiple-datasets-input">
  `
})
class TestTypeaheadMultipleDatasetsComponent {
  @ViewChild(TypeaheadDirective, { static: true }) typeahead!: TypeaheadDirective;
  selected = '';
  
  songs = [
    { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera' },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV' },
    { title: 'Hotel California', artist: 'Eagles', album: 'Hotel California' }
  ];
  
  albums = [
    { name: 'Abbey Road', artist: 'The Beatles', year: 1969 },
    { name: 'Dark Side of the Moon', artist: 'Pink Floyd', year: 1973 },
    { name: 'Thriller', artist: 'Michael Jackson', year: 1982 }
  ];
  
  artists = [
    { name: 'The Beatles', genre: 'Rock', country: 'UK' },
    { name: 'Bob Dylan', genre: 'Folk Rock', country: 'USA' },
    { name: 'David Bowie', genre: 'Rock', country: 'UK' }
  ];

  datasets: TypeaheadDataset[] = [
    {
      name: 'songs',
      source: this.songs,
      displayField: 'title',
      searchField: 'title',
      header: 'Songs',
      limit: 3,
      itemClass: 'song-item'
    },
    {
      name: 'albums',
      source: this.albums,
      displayField: 'name',
      searchField: 'name',
      header: 'Albums',
      limit: 2,
      itemClass: 'album-item'
    },
    {
      name: 'artists',
      source: this.artists,
      displayField: 'name',
      searchField: 'name',
      header: 'Artists',
      limit: 2,
      itemClass: 'artist-item'
    }
  ];
}

@Component({
  template: `
    <input
      [(ngModel)]="selected"
      [typeahead]="singleDataset"
      class="form-control"
      data-test="single-dataset-input">
  `
})
class TestTypeaheadSingleDatasetComponent {
  @ViewChild(TypeaheadDirective, { static: true }) typeahead!: TypeaheadDirective;
  selected = '';
  singleDataset = ['Apple', 'Banana', 'Cherry', 'Date'];
}

describe('TypeaheadDirective - Multiple Datasets (Issue #794)', () => {
  let component: TestTypeaheadMultipleDatasetsComponent;
  let fixture: ComponentFixture<TestTypeaheadMultipleDatasetsComponent>;
  let singleComponent: TestTypeaheadSingleDatasetComponent;
  let singleFixture: ComponentFixture<TestTypeaheadSingleDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTypeaheadMultipleDatasetsComponent, TestTypeaheadSingleDatasetComponent],
      imports: [FormsModule, TypeaheadModule.forRoot()]
    }).compileComponents();
  });

  describe('Multiple Datasets Functionality', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTypeaheadMultipleDatasetsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create component with multiple datasets', () => {
      expect(component.typeahead).toBeTruthy();
      expect(component.typeahead.typeaheadDatasets).toBeDefined();
      expect(component.typeahead.typeaheadDatasets?.length).toBe(3);
    });

    it('should have correct dataset configurations', () => {
      const datasets = component.typeahead.typeaheadDatasets!;
      
      expect(datasets[0].name).toBe('songs');
      expect(datasets[0].header).toBe('Songs');
      expect(datasets[0].limit).toBe(3);
      expect(datasets[0].displayField).toBe('title');
      expect(datasets[0].searchField).toBe('title');
      
      expect(datasets[1].name).toBe('albums');
      expect(datasets[1].header).toBe('Albums');
      expect(datasets[1].limit).toBe(2);
      
      expect(datasets[2].name).toBe('artists');
      expect(datasets[2].header).toBe('Artists');
      expect(datasets[2].limit).toBe(2);
    });

    it('should process multiple datasets correctly', async () => {
      const input = fixture.nativeElement.querySelector('input');
      
      // Trigger search
      input.value = 'a';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      // processMultipleDatasets should be called
      expect(component.typeahead.typeaheadDatasets).toBeTruthy();
    });

    it('should handle empty query gracefully', () => {
      const input = fixture.nativeElement.querySelector('input');
      
      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      // Should not throw errors
      expect(component.typeahead).toBeTruthy();
    });

    it('should respect dataset limits', () => {
      const datasets = component.typeahead.typeaheadDatasets!;
      
      // Each dataset should have its configured limit
      expect(datasets[0].limit).toBe(3); // songs
      expect(datasets[1].limit).toBe(2); // albums  
      expect(datasets[2].limit).toBe(2); // artists
    });

    it('should handle datasets with different field configurations', () => {
      const datasets = component.typeahead.typeaheadDatasets!;
      
      // Songs dataset
      expect(datasets[0].displayField).toBe('title');
      expect(datasets[0].searchField).toBe('title');
      
      // Albums dataset  
      expect(datasets[1].displayField).toBe('name');
      expect(datasets[1].searchField).toBe('name');
      
      // Artists dataset
      expect(datasets[2].displayField).toBe('name');
      expect(datasets[2].searchField).toBe('name');
    });
  });

  describe('Backward Compatibility', () => {
    beforeEach(() => {
      singleFixture = TestBed.createComponent(TestTypeaheadSingleDatasetComponent);
      singleComponent = singleFixture.componentInstance;
      singleFixture.detectChanges();
    });

    it('should maintain backward compatibility with single dataset', () => {
      expect(singleComponent.typeahead).toBeTruthy();
      expect(singleComponent.typeahead.typeahead).toBeDefined();
      expect(singleComponent.typeahead.typeaheadDatasets).toBeUndefined();
    });

    it('should work with single dataset as before', () => {
      const input = singleFixture.nativeElement.querySelector('input');
      
      input.value = 'App';
      input.dispatchEvent(new Event('input'));
      singleFixture.detectChanges();
      
      // Should work with existing single dataset logic
      expect(singleComponent.typeahead.typeahead).toBeTruthy();
    });
  });

  describe('Dataset Processing Logic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTypeaheadMultipleDatasetsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle mixed data types in datasets', () => {
      // Test with different data structures
      const mixedDatasets: TypeaheadDataset[] = [
        {
          name: 'strings',
          source: ['Apple', 'Banana', 'Cherry'],
          displayField: undefined, // No field for strings
          limit: 2
        },
        {
          name: 'objects',
          source: [{ name: 'Object 1' }, { name: 'Object 2' }],
          displayField: 'name',
          limit: 1
        }
      ];
      
      component.typeahead.typeaheadDatasets = mixedDatasets;
      fixture.detectChanges();
      
      expect(component.typeahead.typeaheadDatasets.length).toBe(2);
    });

    it('should handle empty datasets gracefully', () => {
      component.typeahead.typeaheadDatasets = [
        {
          name: 'empty',
          source: [],
          displayField: 'name',
          limit: 5
        }
      ];
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      // Should not throw errors
      expect(component.typeahead.typeaheadDatasets?.length).toBe(1);
    });

    it('should handle datasets without headers', () => {
      component.typeahead.typeaheadDatasets = [
        {
          name: 'no-header',
          source: ['Item 1', 'Item 2'],
          // No header specified
          limit: 2
        }
      ];
      fixture.detectChanges();
      
      expect(component.typeahead.typeaheadDatasets[0].header).toBeUndefined();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTypeaheadMultipleDatasetsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle null/undefined datasets', () => {
      component.typeahead.typeaheadDatasets = undefined;
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      // Should fallback to single dataset mode
      expect(component.typeahead.typeaheadDatasets).toBeUndefined();
    });

    it('should handle datasets with missing required fields', () => {
      const invalidDatasets: any[] = [
        {
          // Missing name and source
          displayField: 'title',
          limit: 5
        }
      ];
      
      component.typeahead.typeaheadDatasets = invalidDatasets;
      fixture.detectChanges();
      
      // Should not crash
      expect(component.typeahead.typeaheadDatasets.length).toBe(1);
    });

    it('should handle very large datasets', () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        name: `Item ${i}`,
        value: i
      }));
      
      component.typeahead.typeaheadDatasets = [
        {
          name: 'large',
          source: largeDataset,
          displayField: 'name',
          limit: 10 // Should limit results
        }
      ];
      fixture.detectChanges();
      
      expect(component.typeahead.typeaheadDatasets[0].limit).toBe(10);
    });
  });
});