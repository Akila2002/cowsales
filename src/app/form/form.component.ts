import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  quoteForm!: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient, private router:Router)  {

  }
  ngOnInit(): void {
    this.initForm(); 
  }
  initForm() {
    this.quoteForm = this.fb.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }
  postdata() {
    this.http.post("", this.quoteForm.value).subscribe((res) => {
    console.log(res);
    alert("Submit successful");
  });
}
getData(){
  this.http.get('http://localhost:3000/posts').subscribe((res)=>{
    console.log(res)
  })
}
  // akila!: FormGroup;
  // constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

  // }
  // ngOnInit(): void {
  //   this.akila = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //     email: ['', Validators.required],
  //     phone: ['', Validators.required],
  //     state: ['', Validators.required]
  //   });
  // }

  // // postdata() {
  // //   this.http.post("https://6529ee5555b137ddc83f33c3.mockapi.io/users", this.aki.value).subscribe(res => {
  // //     console.log(this.aki.value);
  // //     this.router.navigate(['/login']);
  // //     alert("Submit Successfully");
  // //   });
  // // }

  // postdata() {
  //   this.http.post("http://localhost:3000/products", this.akila.value).subscribe((res => {
  //     console.log(this.akila.value);
  //     alert("Submit Successfully");
  //   }));
  // }
  
}
