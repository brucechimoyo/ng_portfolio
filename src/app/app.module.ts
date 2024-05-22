import { TypeWriterXsModule } from './../../node_modules/type-writer-xs/projects/type-writer-xs/src/lib/type-writer-xs.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CountUpModule } from 'ng-count-up-js';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { CommentsComponent } from './components/comments/comments.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressLoaderComponent } from './components/progress-loader/progress-loader.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ResumeComponent,
    PortfolioComponent,
    BlogComponent,
    BlogDetailComponent,
    ContactComponent,
    NavbarComponent,
    BlogCardComponent,
    CommentsComponent,
    CommentItemComponent,
    ProgressLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTypedWriterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    CountUpModule,
    NgxEditorModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
