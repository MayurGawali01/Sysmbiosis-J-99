import { Component, OnInit } from '@angular/core';
import { BookticketService } from '../book-ticket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  tickets: any[] = [];
  userEmail: string = ''; // Email will be entered by the user.

  constructor(private ticketService: BookticketService) {}

  ngOnInit(): void {
    // Optionally load tickets for a default email, if required.
  }

  loadTickets(): void {
    if (this.userEmail.trim() === '') {
      console.error('Email is required to fetch tickets.');
      return;
    }

    this.ticketService.getTicketsByEmail(this.userEmail).subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }
}
