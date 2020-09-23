import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../shared/post.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }
  post: Post;
  form: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params.id);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        orderNumber: new FormControl(post.orderNumber, Validators.required),
        companyName: new FormControl(post.companyName, Validators.required),
        carrier: new FormControl(post.carrier, Validators.required),
        phone: new FormControl(post.phoneNumber, Validators.required),
        comments: new FormControl(post.comments, Validators.required),
        ATI: new FormControl(post.ATI.split('/')[4], Validators.required)
      });
    });
  }

  remove(): void {
    this.postService.remove(this.post.id).subscribe(() => {
      this.router.navigate(['/table']);
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.postService.update({
      date: this.post.date,
      phoneNumber: this.form.value.phone,
      orderNumber: this.form.value.orderNumber,
      companyName: this.form.value.companyName,
      carrier: this.form.value.carrier,
      comments: this.form.value.comments,
      ATI: `https://ati.su/firms/${this.form.value.ATI}/info`,
      id: this.post.id
    }).subscribe(() => {
      this.submitted = false;
    });
  }
}
