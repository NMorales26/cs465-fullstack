import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn't find tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode:', tripCode);

    // Initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Fetch trip details
    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          console.log("API Response:", value);
          if (!value || value.length === 0) {
            this.message = 'No Trip Retrieved!';
          } else {
            this.trip = value[0];  // Assuming API returns an array
            this.editForm.patchValue(value[0]);
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.error('Error fetching trip:', error);
          alert('Failed to retrieve trip data.');
        }
      });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error:', error);
          }
        });
    }
  }

  // Quick access method to form fields
  get f() { return this.editForm.controls; }
}
