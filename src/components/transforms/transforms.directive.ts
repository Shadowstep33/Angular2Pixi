import {
  Directive,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  TweenLite,
  Circ,
  Sine,
  SlowMo,
  Power4
} from "gsap";

@Directive({
  selector: 'a2ptransform, [a2ptransform]',
})
export class TransformDirective {

  @Input('container') container;
  @Input('a2ptransform')
  set transformConfig(value) {
  }

  _transformConfig = {
  }

  tween: any;

  constructor(
  ) {
  }

  ngOnInit() {
    if (this.container === null)
      return;

    this.initTransform();
  }

  initTransform() {

  }

  hoverUp() {
    TweenLite.to(this.container.position, 3, {
      y: "-=30",
      ease: Sine.easeInOut,
      onComplete: this.hoverDown.bind(this)
    });
  }

  hoverDown() {
    TweenLite.to(this.container.position, 4, {
      y: "+=30",
      ease: Sine.easeInOut,
      onComplete: this.hoverUp.bind(this)
    });
  }

  explodeOut() {
    return (new Promise((resolve, reject) => {
      TweenLite.to(this.container, 0.8, {
        alpha: 0
      });
      TweenLite.to(this.container.scale, 0.8, {
        x: 2,
        y: 2,
        onComplete: resolve.bind(this)
      });
    }));
  }

  ngOnDestroy() {
  }
}
