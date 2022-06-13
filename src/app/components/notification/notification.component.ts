import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input()
  notification: any = {};
  @Input()
  unread: boolean = true;
  popover: boolean = false;

  @Output() delete = new EventEmitter <string>() 

  constructor() { }

  ngOnInit(): void {
  }

  // check if popover is open
  isOpen() {
    this.popover = !this.popover;
  }

  // open notification on click
  clickHandler (event: any) {
   if (event.target.id === 'popup') return;
   if (this.popover) { this.popover = false; return; }
   this.unread = false;

   console.log('open up the noti') // call the modal here
  }

  // actions inside popover
  deleteNotification () {
    console.log('delete clicked')
    // this.delete.emit(this.notification.booking_id)  
    this.delete.emit(this.notification.id)  
  }

  turnOffHandler () {
    console.log('turn off clicked')
  }

  bookingIdHandler(url: string) {
    window.open(url, '_blank');
  }

}
