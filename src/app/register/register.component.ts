import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/Device';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  failedRegister: boolean = false;
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });

  private device: Device;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private deviceService: DeviceService) {
    deviceService.getByUUID(this.route.snapshot.queryParamMap.get('uuid')).subscribe(d => {
      this.device = d;
    }, err => { this.router.navigate(['/login']); });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.loadExternalJS();
  }

  private loadExternalJS() {
    const dynamicScripts = [
      '/assets/js/main.js',
    ];

    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  onSubmit() {
    let user: User = new User();

    user.username = this.form.value.username;
    user.email = this.form.value.email;
    user.password = this.form.value.password;
    user.phoneNumber = this.form.value.phone;
    user.deviceId = this.device.deviceId;

    this.userService.register(user).subscribe(u => {
      this.router.navigate(['/login']);
    }, e => this.failedRegister = true);
  }
}
