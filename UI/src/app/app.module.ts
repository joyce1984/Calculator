import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { DisplayComponent } from './calculator/components/display/display.component';
import {ButtonComponent} from './calculator/components/buttons/button.component'
import { HttpClientModule } from '@angular/common/http';
import { ResizableModule } from 'angular-resizable-element';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HistoryComponent } from './calculator/components/history/history.component';
import { ErrorComponent } from './calculator/components/errors/errors.component';
import { ToggleComponent } from './calculator/components/toggle/toggle.component';
import { ExamComponent } from './exam.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    DisplayComponent,
    ButtonComponent,
    HistoryComponent,
    ErrorComponent,
    ToggleComponent,
    ExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ResizableModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
