import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  imgsArr;
  bigImgData;

  constructor(private http: Http, private elementRef: ElementRef) {  }

  openBigImage(): void {
    this.http.get('../../../assets/json/bigImgData.json')
      .subscribe((data) => this.bigImgData = data.json(), (err) => console.log(err));
    this.elementRef.nativeElement.querySelector('.imageDetailsContainer').style.display = 'flex';
  }

  closeBigImage(): void {
    this.elementRef.nativeElement.querySelector('.imageDetailsContainer').style.display = 'none';
  }

  clickLikeDislike(event): void {
    if ( event.target.classList.contains('active') ) {
      event.target.classList.remove('active');
      event.target.classList[1] === 'like' ? this.bigImgData.likeNum-- : this.bigImgData.dislikeNum--;
    } else {
      [].forEach.call(event.target.parentElement.children,
        (item) => {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
            item.classList[1] === 'like' ? this.bigImgData.likeNum-- : this.bigImgData.dislikeNum--;
          }
        });
      event.target.classList.add('active');
      event.target.classList[1] === 'like' ? this.bigImgData.likeNum++ : this.bigImgData.dislikeNum++;
    }
  }

  addComment(): void {
    if ( this.elementRef.nativeElement.querySelector('.userNickname').value && this.elementRef.nativeElement.querySelector('textarea').value ) {
      this.bigImgData.comments.unshift({
        'author' : this.elementRef.nativeElement.querySelector('.userNickname').value,
        'date' : new Date().toString(),
        'message' : this.elementRef.nativeElement.querySelector('textarea').value
      });
      /*there will be method to sent new data to server for save*/
      this.elementRef.nativeElement.querySelector('.userNickname').value = this.elementRef.nativeElement.querySelector('textarea').value = '';
    }
  }

  submitNewImg(event): void {
    let elem = document.createElement('img');
    elem.src = event.target.parentElement.querySelector('input').value;
    let obs = new Observable( observer => {
      setTimeout(() => {
        observer.next();
      }, 1000);
    });
      obs.subscribe(() => {
        if (elem.naturalHeight && elem.naturalWidth) {
          this.imgsArr.push({
            url : elem.src,
            width : +(elem.naturalWidth / 236).toFixed(0) * 236 + (10 * (+(elem.naturalWidth / 236).toFixed(0) - 1)),
            height : +(elem.naturalHeight / 236).toFixed(0) * 200 + (10 * (+(elem.naturalHeight / 236).toFixed(0) - 1)),
            commentNum : 0,
            dislikeNum : 0,
            likeNum : 0
          });
        } else {
          console.log('invalid url');
        }
      }, err => console.log(err));
    event.target.parentElement.querySelector('input').value = '';
    this.elementRef.nativeElement.querySelector('.addForm').style.display = 'none';
  }
  revealAddForm(event): void {
    this.elementRef.nativeElement.querySelector('.addForm').style.display = 'flex';
  }
  ngOnInit() {
    this.http.get('../../../assets/json/tasks.json')
      .subscribe( data => this.imgsArr = data.json(), (err) => console.log(err));
  }
}
