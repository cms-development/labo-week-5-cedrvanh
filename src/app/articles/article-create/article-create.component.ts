import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {
  article: Article;
  title: string;
  body: string;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    console.log('Create Page');
  }

  onSubmit(): void {
    const newArticle = new Article();
    newArticle.data = this.article;

    this.articleService.createArticle(newArticle)
      .subscribe(res => {
        console.log('Created Article', res);
      });
  }
}
