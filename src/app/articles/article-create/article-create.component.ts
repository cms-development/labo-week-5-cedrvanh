import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {
  article: Article = {
    title: '',
    body: '',
    data: '',
  };

  constructor(
    private articleService: ArticleService,
    private router: Router) { }

  ngOnInit() {
    console.log('Create Page');
  }

  onSubmit(title: string, text: string): void {
    this.articleService.createArticle(title, text)
      .subscribe(res => {
        console.log('Created Article', res);
        this.router.navigate(['articles']);
      });
  }
}
