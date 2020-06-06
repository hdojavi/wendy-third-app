import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  failedLogin: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

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
    user.email = this.form.value.email;
    user.password = this.form.value.password;
    this.authService.login(user).subscribe(u => {
      this.router.navigate(['/graphics']);
    }, e => { this.failedLogin = true });

  }
}
