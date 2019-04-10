import { Component, OnInit, OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader.service';
import { LoaderState } from './loader.model';
import{ ChangeDetectorRef } from '@angular/core';
@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService,
    private cdRef : ChangeDetectorRef) 
    {
     this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
      this.cdRef.detectChanges();
    }); }

  ngOnInit() {
   
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}