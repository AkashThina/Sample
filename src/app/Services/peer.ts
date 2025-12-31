import { Injectable } from '@angular/core';
import Peer from 'peerjs';
@Injectable({
  providedIn: 'root',
})
export class PeerServices {

  peer!: Peer;
  myPeerId!: string;

  initPeer(): Peer {
    this.peer = new Peer();
    this.peer.on('open', id => {
      this.myPeerId = id;
      console.log('My Peer ID:', id);
    });
    return this.peer;
  }
}
