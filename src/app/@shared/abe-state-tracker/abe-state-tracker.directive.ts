import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Subject } from "rxjs";
import { map, debounceTime, filter } from "rxjs/operators";

/**
 * Tracker for abe objects
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'abe-text,abe-radio-group,abe-checkbox,abe-dropdown,abe-datepicker,abe-textarea,abe-radio'
})
export class AbeStateTrackerDirective implements OnInit, OnDestroy {

  /** register changes in the classlist in order to set the invalid property on the abe element  */
  private readonly classList$ = new Subject<DOMTokenList>();
  /** reference to the html element */
  private element: HTMLElement;
  /** listener to add the the invalid state to the abe element */
  private mutations: MutationObserver;

  constructor(ref: ElementRef, private renderer: Renderer2) {
    this.element = <HTMLScriptElement>ref.nativeElement;
    this.mutations = new MutationObserver(() => this.classList$.next(this.element.classList));
   }

  ngOnInit(): void {
    this.classList$
    .pipe(map(list => list.contains('ng-touched') && list.contains('ng-invalid')), debounceTime(50))
    .pipe(filter(invalid => invalid !== this.element.hasAttribute('invalid')))
    .subscribe(invalid => {
      // todo datepicker component set's his own invalid state, which is not cool
      this.renderer.setProperty(this.element, 'invalid', invalid);});

      this.mutations.observe(this.element, {attributes: true});

  }

  ngOnDestroy(): void {
    this.mutations.disconnect();
  }
}
