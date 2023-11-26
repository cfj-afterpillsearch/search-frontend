import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
})
export class ErrorComponent implements OnInit {
  errorCode: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.errorCode = params.get('errorCode');
    });
  }
}
