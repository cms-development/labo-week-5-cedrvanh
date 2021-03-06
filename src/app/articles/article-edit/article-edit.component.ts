import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../models/article';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  article: Article;
  id: string;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(`Article Id: ${this.id}`);
    this.getArticleById(this.id);
  }

  getArticleById(id: string) {
    this.articleService.getArticleById(id)
      .subscribe(res => {
        this.article = res.data;
      });
  }

  updateArticle(id: string): void {
    const newArticle = new Article();
    newArticle.data = this.article;

    this.articleService.updateArticle(id, newArticle)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['articles']);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
