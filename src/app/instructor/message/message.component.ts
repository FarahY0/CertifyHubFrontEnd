import { Component, OnInit } from '@angular/core';
import { StreamChat, ChannelData, Message } from 'stream-chat';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  client: any; 
  
  constructor() { }

  ngOnInit(): void {
    this.setupStreamChat();
  }

  async setupStreamChat() {
    this.client = StreamChat.getInstance("dz5f4d5kzrue");
    
    try {
      await this.client.connectUser({
        id: "cool-tree-5",
        name: "cool",
        image: "https://bit.ly/2u9Vc0r",
      }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY29vbC10cmVlLTUiLCJleHAiOjE3MDQyNTczMDB9.uHlDwwclHqKik8T3G1ilE23pWHdd7vEVH4sCa7J-3Rw"); // token generated server side
      
      console.log("Connected to Stream Chat:", this.client);
      
      // Further actions like subscribing to channels, sending/receiving messages, etc., can be implemented here
    } catch (error) {
      console.error("Error connecting to Stream Chat:", error);
    }
  }

  // Additional methods for sending/receiving messages and managing the chat interface can be defined here
}
