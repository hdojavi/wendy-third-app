import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.component.html',
  styleUrls: ['./qrreader.component.scss']
})
export class QRreaderComponent implements OnInit {

  public qrdevice: string = null;
  
  constructor(private deviceService: DeviceService, private route: ActivatedRoute) {
    this.route.params.subscribe(actualRoute => {
      this.deviceService.getById(actualRoute.id).subscribe(device => {
        this.qrdevice = `http://192.168.1.35:4200/register?uuid=${device.uuid}`;
      });
    })
  }

  ngOnInit() {
  }

}
