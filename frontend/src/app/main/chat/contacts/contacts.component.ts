import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() chats;
  @Input() userRead;
  @Output() onActiveChat = new EventEmitter();

  chatSelected: any;
  userName: string;
  checkLogin: any;
  authId: any;

  constructor() {}

  ngOnInit() {
    this.checkLogin = localStorage.getItem('currentUser');
    if (this.checkLogin != null) {
      this.userName = JSON.parse(this.checkLogin).name;
      this.authId = JSON.parse(this.checkLogin).user_id;
    }
  }

  setActiveChat(chat) {
    this.chatSelected = chat;
    this.onActiveChat.emit(chat);
  }
}
