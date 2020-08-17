import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { CirclesSparklineComponent } from './circles-sparkline/circles-sparkline.component';

@NgModule({
  declarations: [CirclesSparklineComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [CirclesSparklineComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(CirclesSparklineComponent, {
      injector,
    });
    customElements.define('circles-sparkline', webComponent);
  }

  ngDoBootstrap() {}
}
