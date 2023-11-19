import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf],
})
export class ErrorComponent implements OnInit {
  errorCode: string | null = null;
  errorMessage = '';
  errorDetailMessage: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.errorCode = params.get('errorCode');

      switch (this.errorCode) {
        case '404':
          this.errorMessage = 'ページが見つかりません。';
          this.errorDetailMessage = 'URLに誤りがあるか、お探しのページは移動もしくは削除された可能性があります。';
          break;
        case '500':
          this.errorMessage = 'サーバーエラーが発生しました。';
          this.errorDetailMessage = '再度時間をおいてアクセスしてください。';
          break;
        default:
          this.errorMessage = 'エラーが発生しました。';
          break;
      }
    });
  }
}
