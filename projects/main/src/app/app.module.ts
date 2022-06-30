import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppHomeModule } from './page/home/home.module';
import { reducers, metaReducers } from './reducers';
import { AppAdminAuthDialogModule } from './view/dialogs/admin/admin-auth-dialog/admin-auth-dialog.module';
import { ViewModule } from './view/view.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from 'projects/shared/src/common';

const initApp = () => initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    AppHomeModule,
    ViewModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    provideFirebaseApp(() => initApp()),
    provideFirestore(() => {
      const db = getFirestore();
      if (environment.useEmulator) {
        connectFirestoreEmulator(db, 'localhost', 8080);
      }
      return db;
    }),
    provideFunctions(() => {
      const func = getFunctions();
      if (environment.useEmulator) {
        connectFunctionsEmulator(func, 'localhost', 5001);
      }
      return func;
    }),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulator) {
        connectAuthEmulator(auth, 'http://localhost:9099');
      }
      return auth;
    }),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    AppAdminAuthDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
