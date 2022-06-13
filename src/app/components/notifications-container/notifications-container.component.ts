import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InfiniteScrolling } from './handleInfiniteScrolling';

@Component({
  selector: 'app-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.css']
})
export class NotificationsContainerComponent implements OnInit {

  ten: any[] = Array(10).fill(true);
  limit: number = 10

  notifications: any[] = [];

  unread_arr: boolean[] = []
  current_page: number = 1;
  isScrollingBottom = true;
  isBottomOfScreen = true;

  constructor(private _httpClient: HttpClient, private scrollService: InfiniteScrolling) { }

  ngOnInit(): void {

    this.scrollEventCheck()

    this.getNotitications()
    console.log(this.isBottomOfScreen)
    this.scrollService.getObservable().subscribe(status => {
      if (status && this.isScrollingBottom && this.isBottomOfScreen) {
        this.limit = this.limit + 10;
        this.current_page++;
        this.getNotitications();
      }
    })
  }

  getNotitications() {
    console.log('\n')
    console.log('...loading')
    this.getNotificationsApi(this.current_page).subscribe((state: any) => {
      console.log('...loaded')
      const _state: NotificationData = state
      this.notifications = [
        ...this.notifications,
        ..._state.data
      ]
      this.unread_arr = [...this.unread_arr, ...this.ten]
      console.log(state);
    })

    let clear = setInterval(() => {
      console.log(this.limit)
      let target = document.querySelector(`#target${this.limit}`);
      if (target) {
        console.log("element found")
        clearInterval(clear);
        this.scrollService.setObserver().observe(target);
      }
    }, 2000,
      (err: any) => {
        console.log(err);
      })
  }

  getNotificationsApi(_page: number) {
    return this._httpClient.get(`https://dummyapi.io/data/v1/post?limit=10&page=${_page}`, {
      headers: new HttpHeaders({
        'app-id': '62a33784a7b308ae7c090df5'
      })
    })
  }

  // remove when removing show more button
  showHandler() {
    this.current_page++;
    this.getNotitications();
    console.log(this.notifications);
  }

  // scrollinf event listener, checks if the target element is in view or if the bottom of the screen has been reached
  scrollEventCheck() {
    let scroll_position = 0;
    let scroll_direction;

    window.addEventListener('scroll', (e) => {
      scroll_direction = (document.body.getBoundingClientRect()).top > scroll_position ? 'up' : 'down';
      scroll_position = (document.body.getBoundingClientRect()).top;
      this.isScrollingBottom = scroll_direction === 'down' ? true : false
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        this.isBottomOfScreen = true;
      }
      else {
        this.isBottomOfScreen = false;
      }
    });
  }

  deleteHandler(id: string) {
    console.log(id)
    let index = this.notifications.findIndex((booking) => {
      return booking.id === id;
    })
    if (index !== -1) this.notifications = this.notifications.filter((booking) => booking.id != id);
    // window.location.reload();

    console.log(this.notifications)
  }
}

interface NotificationData {
  data: any[]
  limit: number
  page: number
  total: number
}
