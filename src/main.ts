// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';


// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


//add browser animations module
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config'; // Ensure this imports correctly

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserAnimationsModule)]
})
  .catch((err) => console.error(err));
