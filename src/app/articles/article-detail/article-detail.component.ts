import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  id: string;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getArticleById(this.id);
    console.log(`Article Id: ${this.id}`);
  }

  getArticleById(id: string) {
    this.articleService.getArticleById(id)
      .subscribe(res => {
        this.article = res.data;
        console.log('Fetched Article by Id', this.article);
      });
  }

  deleteArticle(id: string) {
    this.articleService.deleteArticle(id)
      .subscribe(res => {
        console.log('Deleting article', res);
      });
  }
}
