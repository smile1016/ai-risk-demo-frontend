import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { UploadTaskComponent } from './app/components/upload-task/upload-task.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
