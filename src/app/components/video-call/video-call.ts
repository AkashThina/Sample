import { Component, ElementRef, ViewChild } from '@angular/core';
import { PeerServices } from '../../Services/peer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-call',
  imports: [FormsModule, CommonModule],
  templateUrl: './video-call.html',
  styleUrl: './video-call.css',
})
export class VideoCall {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  peer: any;
  localStream!: MediaStream;
  remotePeerId: string = '';

  isAudioMuted: boolean = false;
  isVideoHidden: boolean = false;
  isCallActive: boolean = false;

  constructor(public peerService: PeerServices) { }

  async ngOnInit() {
    this.peer = this.peerService.initPeer();

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      this.localVideo.nativeElement.srcObject = this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }

    this.peer.on('call', (call: any) => {
      this.isCallActive = true;
      call.answer(this.localStream);
      call.on('stream', (remoteStream: MediaStream) => {
        this.remoteVideo.nativeElement.srcObject = remoteStream;
      });
    });
  }

  callPeer() {
    if (!this.remotePeerId) return;
    this.isCallActive = true;
    const call = this.peer.call(this.remotePeerId, this.localStream);
    call.on('stream', (remoteStream: MediaStream) => {
      this.remoteVideo.nativeElement.srcObject = remoteStream;
    });
  }

  toggleAudio() {
    this.isAudioMuted = !this.isAudioMuted;
    this.localStream.getAudioTracks().forEach(track => {
      track.enabled = !this.isAudioMuted;
    });
  }

  toggleVideo() {
    this.isVideoHidden = !this.isVideoHidden;
    this.localStream.getVideoTracks().forEach(track => {
      track.enabled = !this.isVideoHidden;
    });
  }

  endCall() {
    // Basic implementation for now, ideally would close peer connection
    this.isCallActive = false;
    if (this.remoteVideo && this.remoteVideo.nativeElement) {
      this.remoteVideo.nativeElement.srcObject = null;
    }
    window.location.reload(); // Simple reset
  }
}
