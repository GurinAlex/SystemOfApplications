import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../shared/interfaces';
import {PostService} from '../shared/post.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  constructor(private postService: PostService) { }
  form: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      orderNumber: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      carrier: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required]),
      ATI: new FormControl('', [Validators.required])
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const post: Post = {
      date: new Date(),
      phoneNumber: this.form.value.phone,
      orderNumber: this.form.value.orderNumber,
      companyName: this.form.value.companyName,
      carrier: this.form.value.carrier,
      comments: this.form.value.comments,
      ATI: `https://ati.su/firms/${this.form.value.ATI}/info`,
    };

    this.postService.sendPost(post).subscribe(() => {
      this.submitted = false;
      this.form.reset();
    }, error => {
      this.submitted = true;
      throw new Error(error);
    });
  }
}
