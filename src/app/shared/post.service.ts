import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './interfaces';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {}

  sendPost(post: Post): Observable<any> {
    return this.http.post('https://systemofapplications.firebaseio.com/posts.json', post);
  }

  getAll(): Observable<Post []> {
    return this.http.get('https://systemofapplications.firebaseio.com/posts.json')
      .pipe(map((response: {[key: string]: any}) => {
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key
        }));
      }));
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`https://systemofapplications.firebaseio.com/posts/${id}.json`)
      .pipe(map( (post: Post) => {
        return {
          ...post,
          id,
        };
      }));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`https://systemofapplications.firebaseio.com/posts/${id}.json`);
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`https://systemofapplications.firebaseio.com/posts/${post.id}.json`, post);
  }
}
