import {
  Component,
  Input,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  AfterViewChecked
} from '@angular/core';
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
  @Input() authId;
  @Input() userRead;
  @Output() onActiveChat = new EventEmitter();

  newMessage: any;

  @ViewChild('chatScroll') public chatScroll: PerfectScrollbarComponent;
  DEFAULT_PERFECT_SCROLLBAR_CONFIG: any;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.activeChat) {
      this.scrollToBottom();
    }
  }

  send() {
    if (this.newMessage && this.newMessage.trim() != '') {
      const message = this.newMessage;
      const now = moment().format('YYYY/MM/DD HH:mm:ss');
      const key = this.activeChat.key;
      const conversationRef = firebase.database().ref(`conversations/${key}`);
      const chat = {
        message,
        createdAt: now,
        senderId: this.authId
      };

      if (this.messages && this.messages.length > 0) {
        this.messages.push(chat);
      } else {
        this.messages = [];
        this.messages.push(chat);
      }

      conversationRef.child('lastMessage').set(message);
      conversationRef.child('lastMessageTime').set(now);
      conversationRef.child('lastSenderId').set(this.authId);
      conversationRef.child('checkSeenMessage').set([this.authId]);
      conversationRef.child('ownerRead').set(this.authId);
      conversationRef.child('userRead').set(this.userRead);
      conversationRef.child('messages').set(this.messages);
      // this.onActiveChat.emit(this.activeChat);
      this.newMessage = null;
    }

    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatScroll.directiveRef.update();
      this.chatScroll.directiveRef.scrollToBottom();
    }, 200);
  }

  onChatSideTriggered() {
    this.chatSidenav.toggle();
  }
}
