import { SearchCredentials } from './../@model/search-credentials.model';
import { Component, EventEmitter, OnInit, Output, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NamedFormGroup, Like, namedFormGroupParser } from 'src/app/@shared/form-utils/form-utils.module';
import { SearchPolicy } from '../@model/search-policy.model';
import { SearchRequest } from '../@model/search-request.model';
import { merge, Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { noFutureDateValidation } from 'src/app/@shared/form-utils/validators/no-future-date.validator';
import { policyNrValidation } from 'src/app/@shared/form-utils/validators/policynr.validator';

/**
 * The search component page
 * It is a child of the search-client-component
 * It will emit the search form to it's parent
 */
@Component({
  selector: 'broker-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SearchComponent implements OnInit, OnDestroy {

  /** output event when clicking on the search button */
  @Output() request = new EventEmitter<unknown>();

  // Different forms for the 3 different parts of the screen
  /** form to search on credentials */
  formSearchCredentials : NamedFormGroup<Like<SearchCredentials>>;
  /** form to search based on policy */
  formSearchPolicy : NamedFormGroup<Like<SearchPolicy>>;
  /** form to check if mandate checkbox is ticked */
  formCheckboxes : FormGroup;

  // Different controls for the different control access parts of the screen
  /** the controls of the credentials to be accessed in the html */
  controlsSearchCredentials : Like<SearchCredentials>;
  /** the controls of the policy to be accessed in the html */
  controlsSearchPolicy : Like<SearchPolicy>;

  /** Destory object to unsubscribe subcribers when component is destoryed */
  destroy$: Subject<boolean> = new Subject<boolean>();

  /** Observable to have disable functionality on search button */
  searchBlocked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  /** The error message shown on the checkbox */
  mandateError = true;

  /** The format of the policy in regex form */
  policyFormat = /^[Bb][\s/\s]*([\d]{4})[\s/\s]*([\d]{3})[\s]?([\d]{3})[\s]?([\d]{3})[\s]*$/;

  constructor(
    private fb : FormBuilder
  ) {}


  ngOnInit(): void {
    this.initializeForms();
    this.addEnabler();

    // Manage blur on the credentials (left side) of the screen
    this.formSearchPolicy.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      v => this.manageBlur(String(v.policynr), this.formSearchCredentials)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Function called when search button is pressed
   * output 'request' is emitted when form is validated
   */
  search(){
    const requestParam : Like<SearchRequest> = this.requestValidation()
    if(this.formCheckboxes.valid && requestParam){

      this.searchBlocked$.next(true);
      this.manageMandateError(true);
      this.request.emit(requestParam);
    }
    else{
      this.manageMandateError(false);
      this.formCheckboxes.markAllAsTouched();
    }
  }

  /**
   * Format the policy field when onBlur event is activated
   * @returns
   */
  formatPolicyNr() {
    if(this.formSearchPolicy.valid){
      const regex = /^[Bb][\s/\s]*([\d]{4})[\s/\s]*([\d]{3})[\s]?([\d]{3})[\s]?([\d]{3})[\s]*$/;
      const groups = regex.exec(String(this.formSearchPolicy.value.policynr));
      if(groups){
        const formattedPolicy = `B / ${groups[1]} / ${groups[2]} ${groups[3]} ${groups[4]}`
        this.formSearchPolicy.controls['policynr'].setValue(formattedPolicy);
      }
    }
  }

  /**
   * Opens a link in a new tab
   * @param link
   */
  openLinkInNewTab(link : string){
    // TODO open the correct link
    window.open(link, "_blank");
  }

  /**
   * Changes the value of the mandateError
   * @param value
   */
  manageMandateError(value : boolean){
    this.mandateError = value;
  }

  // Private functions

  /**
   * Initizalizing the different forms
   */
   private initializeForms() {
    this.formSearchCredentials = namedFormGroupParser(this.fb.group(
      {
        firstname : ['', [Validators.required, Validators.minLength(3)]],
        lastname : ['',  [Validators.required, Validators.minLength(3)]],
        dob: ['', [noFutureDateValidation]],
        partial: false
      }
    ));
    this.controlsSearchCredentials = this.formSearchCredentials.controls;


    this.formSearchPolicy = namedFormGroupParser(this.fb.group(
      {
        policynr : ['', [policyNrValidation]]
      }
    ));
    this.controlsSearchPolicy = this.formSearchPolicy.controls;

    this.formCheckboxes = new FormGroup({
      mandate: new FormControl(false, Validators.requiredTrue),
    });
  }

  /**
   * Listen to any change in the formelements in order to enable/disable the search button
   */
   private addEnabler(){
    merge(this.formSearchPolicy.valueChanges, this.formSearchCredentials.valueChanges)
      .pipe(map(() => this.requestValidation() === null))
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (ve) => {this.searchBlocked$.next(ve);}
      );
  }

  /**
   * Check validation of the form(s)
   * @returns validated object
   */
  private requestValidation() : Like<SearchRequest> {
    if(this.formSearchCredentials.valid){
      return this.formSearchCredentials.value;
    }
    else if(this.formSearchPolicy.valid && this.controlsSearchPolicy.policynr['value']){
      return this.formSearchPolicy.value;
    }
    return null;
  }

  /**
   * Blur the credentials side of the screen
   * @param value
   * @param form
   */
  private manageBlur(value : string, form: NamedFormGroup<Like<SearchRequest>>){
    if(value?.length > 0){
      this.formSearchCredentials.reset();
      this.formSearchCredentials.disable();
    }
    else {
      this.formSearchCredentials.enable();
    }
  }

}

