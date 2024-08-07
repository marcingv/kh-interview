import { bootstrapApplication } from '@angular/platform-browser';
import { enableMapSet } from 'immer';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

enableMapSet();

bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => {
  console.error(error);
});
