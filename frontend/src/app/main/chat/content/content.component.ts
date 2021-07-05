import { Component, Input, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { fuseAnimations } from '../../../core/animations';
import * as moment from 'moment';
import firebase from 'firebase';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class ContentComponent implements OnInit {

  @Input() chatSidenav;
  @Input() activeChat;
  @Input() messages;

  senderIdOwner = 1;
  read = 1;
  unRead = 2;
  newMessage: any;

  @ViewChild('chatScroll') public chatScroll: PerfectScrollbarComponent;
  DEFAULT_PERFECT_SCROLLBAR_CONFIG: any;

  constructor() { }

  // tslint:disable-next-line:typedef
  ngOnInit() { }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnChanges() {
    if (this.activeChat) {
      this.scrollToBottom();
    }
  }

  // tslint:disable-next-line:typedef
  send() {
    if (this.newMessage && this.newMessage !== null) {
      const message = this.newMessage;
      const now = moment().format('YYYY/MM/DD HH:mm:ss');
      const key = this.activeChat.key;
      const conversationRef = firebase.database().ref(`conversations/${key}`);

      const chat = {
        message,
        createdAt: now,
        senderId: this.senderIdOwner
      };

      if (this.messages && this.messages.length > 0) {
        this.messages.push(chat);
      } else {
        this.messages = [];
        this.messages.push(chat);
      }

      conversationRef.child('lastMessage').set(message);
      conversationRef.child('lastMessageTime').set(now);
      conversationRef.child('lastSenderId').set(this.senderIdOwner);
      conversationRef.child('ownerRead').set(this.read);
      conversationRef.child('userRead').set(this.unRead);
      conversationRef.child('messages').set(this.messages);

      this.newMessage = null;
    }

    this.scrollToBottom();
  }

  // tslint:disable-next-line:typedef
  scrollToBottom() {
    setTimeout(() => {
      this.chatScroll.directiveRef.update();
      this.chatScroll.directiveRef.scrollToBottom();
    }, 200);
  }

  // tslint:disable-next-line:typedef
  onChatSideTriggered() {
    this.chatSidenav.toggle();
  }
}
