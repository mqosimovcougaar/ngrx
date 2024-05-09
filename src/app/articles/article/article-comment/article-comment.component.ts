import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Article, User } from '../../../core/api-types';
import { Comment } from '../../index';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cdt-article-comment',
  standalone: true,
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input() currentUser!: User;
  @Input() comment!: Comment;
  @Input() article!: Article;
  @Output() delete: EventEmitter<{
    commentId: number;
    slug: string;
  }> = new EventEmitter();
}
