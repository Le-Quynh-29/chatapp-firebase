import { Component, OnInit, ViewEncapsulation, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { fadeInAnimation } from '../../core/animations';
import firebase from 'firebase';

export const snapshotToArray = (snapshot: any) => {
  const arr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      arr.push(item);
  });

  return arr;
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})

export class ChatComponent implements OnInit, AfterViewChecked {

  // tslint:disable-next-line:variable-name
  _refConversation = firebase.database().ref('conversations/');
  conversations = [];
  activeChat: any;
  messages: any[];

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // start blocking
    this.blockUI.start();
    // orderByChild default asc
    this._refConversation.orderByChild('lastMessageTime').on('value', resp => {
      this.conversations = snapshotToArray(resp);
      // reverse order last message time desc
      this.conversations = this.conversations.reverse();
      // set time out stop blocking
      setTimeout(() => {
        this.blockUI.stop();
      }, 1000);
    });
    // create conversation demo
    // this.createConversation();
  }

  // tslint:disable-next-line:typedef
  ngAfterViewChecked() {
    if (this.activeChat) {
      const key = this.activeChat.key;
      const conversation = this.conversations.filter(item => item.key === key)[0];
      if (conversation) {
        this.activeChat = conversation;
      }
      this.onActiveChat(this.activeChat);
    }
    this.cdr.detectChanges();
  }

  // tslint:disable-next-line:typedef
  createConversation() {
    const conversation = {
      conversationName: 'Angular 2 交流群',
      members: [1, 2],
      lastMessage: 'Angular 2 有哪些开源项目?',
      lastMessageTime: '2021/06/09 8:20:01',
      messages: [
        {
          message: '这是 Angular 2 交流群',
          createdAt: '2021/06/09 8:19:01',
          senderId: 1
        },
        {
          message: 'Angular 2 有哪些开源项目?',
          createdAt: '2021/06/09 8:20:01',
          senderId: 2
        }
      ]
    };

    const newConversation = this._refConversation.push(conversation);
    newConversation.set(conversation);
  }

  // tslint:disable-next-line:typedef
  onActiveChat(chat) {
    this.activeChat = chat;
    this.messages = chat.messages;
    // Read message
    const key = chat.key;
    const conversationRef = firebase.database().ref(`conversations/${key}`);
    conversationRef.child('ownerRead').set(1);
  }
}
