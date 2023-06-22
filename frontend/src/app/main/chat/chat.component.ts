import {Component, OnInit, ViewEncapsulation, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {fadeInAnimation} from '../../core/animations';
import firebase from 'firebase';
import {UserService} from "../../core/services";
import {Router} from "@angular/router";

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
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})

export class ChatComponent implements OnInit {

  _refConversation = firebase.database().ref('conversations/');
  conversations = [];
  activeChat: any;
  messages: any[];
  checkLogin: any;
  listUser: any[] = [];
  authId: any;
  userRead: any;
  username: any;
  indexCreateConversation: number = 0;

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    // orderByChild default asc
    this._refConversation.orderByChild('lastMessageTime').on('value', resp => {
      this.checkLogin = localStorage.getItem('currentUser');
      if (this.checkLogin != null) {
        const conversation = snapshotToArray(resp);
        this.checkLogin = JSON.parse(this.checkLogin);
        this.authId = this.checkLogin.user_id;
        this.username = this.checkLogin.name;
        this.userService.getUsers().subscribe(
          (data: any) => {
            this.listUser = data;
            if (conversation.length > 0) {
              this.conversations = conversation.filter(value => value.members.indexOf(this.authId) != -1).reverse();
              if (this.listUser.length - 1 != this.conversations.length) {
                  this.createConversation();
              }
              this.indexCreateConversation += 1;
            } else {
              this.createConversation();
              this.indexCreateConversation += 1;
            }
          }, (error: any) => {
          }
        );
      }
    });
  }

  createConversation() {
    if (this.listUser.length > 0 && this.indexCreateConversation < this.listUser.length) {
      const checkExistConversation = this.conversations.filter(value => value.members.indexOf(this.authId) != -1 &&
        value.members.indexOf(this.listUser[this.indexCreateConversation].id) != -1);
      if (this.listUser[this.indexCreateConversation].id != this.authId && checkExistConversation.length == 0) {
        const conversation = {
          conversationName: [this.username, this.listUser[this.indexCreateConversation].name],
          members: [this.authId, this.listUser[this.indexCreateConversation].id],
          lastMessage: '',
          lastMessageTime: '',
        };

        const newConversation = this._refConversation.push(conversation);
        newConversation.set(conversation);
      }
    }
  }

  onActiveChat(chat) {
    this.activeChat = chat;
    this.messages = chat.messages;
    this.userRead = chat.members.find(value => value != this.authId);
    // Read message
    const key = chat.key;
    const conversationRef = firebase.database().ref(`conversations/${key}`);
    conversationRef.child('ownerRead').set(this.authId);
    if (!chat.checkSeenMessage) {
      conversationRef.child('checkSeenMessage').set([this.authId]);
    } else {
      const checkSeen = chat.checkSeenMessage;
      if (checkSeen.indexOf(this.authId) == -1) {
        checkSeen.push(this.authId);
        conversationRef.child('checkSeenMessage').set(checkSeen);
      }
    }
  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/auth']);
  }
}
