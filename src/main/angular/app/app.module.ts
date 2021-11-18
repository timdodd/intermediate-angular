import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {UserListComponent} from './components/user-list/user-list.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {StepperComponent} from './components/stepper/stepper/stepper.component';
import {StepperNavigationComponent} from './components/stepper/stepper-navigation/stepper-navigation.component';
import {StepperControlsComponent} from './components/stepper/stepper-controls/stepper-controls.component';
import {UserCreateStep1Component} from './components/user-stepper/user-create-step1/user-create-step1.component';
import {UserCreateStep2Component} from './components/user-stepper/user-create-step2/user-create-step2.component';
import {UserCreateStep3Component} from './components/user-stepper/user-create-step3/user-create-step3.component';
import {UserStepperComponent} from './components/user-stepper/user-stepper.component';
import {UserCreateStep4Component} from './components/user-stepper/user-create-step4/user-create-step4.component';
import {LazyStepDirective} from "./components/stepper/step/lazy-step.directive";
import {StepDirective} from "./components/stepper/step/step.directive";


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    StepperComponent,
    StepperNavigationComponent,
    StepperControlsComponent,
    UserCreateStep1Component,
    UserCreateStep2Component,
    UserCreateStep3Component,
    UserStepperComponent,
    UserCreateStep4Component,
    LazyStepDirective,
    StepDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
