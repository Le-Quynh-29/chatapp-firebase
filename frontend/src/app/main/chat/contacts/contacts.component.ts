import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() chats;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onActiveChat = new EventEmitter();

  senderIdOwner = 1;
  read = 1;
  unRead = 2;
  chatSelected: any;

  constructor() { }

  // tslint:disable-next-line:typedef
  ngOnInit() { }

  // tslint:disable-next-line:typedef
  setActiveChat(chat) {
    this.chatSelected = chat;
    this.onActiveChat.emit(chat);
  }
}
