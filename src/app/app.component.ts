import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
