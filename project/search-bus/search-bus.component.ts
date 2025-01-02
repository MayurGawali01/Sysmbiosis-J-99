import { Component } from '@angular/core';
import { BusService } from '../searchbus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent {
  source: string = '';
  destination: string = '';
  buses: any[] = [];
  date: string = '';
  selectedBus: any;
  minDate: string = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format

  constructor(private busService: BusService, private router: Router) {}

  searchBuses() {
    if (this.source && this.destination) {
      this.busService.getBuses(this.source, this.destination).subscribe(
        (response) => {
          if (response && response.length > 0) {
            this.buses = response;
          } else {
            alert('No buses available for the selected route.');
          }
        },
        (error) => {
          console.error('Error fetching buses:', error);
        }
      );
    }
  }
  

  selectBus(bus: any) {
    this.selectedBus = bus; // Set the selected bus
  }

  redirectToBookTicket(): void {
    if (this.selectedBus) {
      this.router.navigate(['/book-ticket'], {
        state: { selectedBus: { ...this.selectedBus, date: this.date } }
      });
    }
  }
}
