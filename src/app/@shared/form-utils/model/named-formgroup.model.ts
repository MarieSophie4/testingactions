import { FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

/** properties that are strongtyped on the formgroup */
type Overwrites = 'registerControl' | 'removeControl' | 'setControl';

/** controller for manual formupdates */
interface FormEventOptions {
  /** When true, each change only affects this control, and not its parent. Default is false. */
  onlySelf?: boolean;
  /**  When true or not supplied (the default), both the statusChanges
   * and valueChanges observables emit events with
   * the latest status and value when the control is reset.
   * When false, no events are emitted. */
  emitEvent?: boolean;
}

/** strongtyped overloading of the formgroup to simplify accessor functions */
export interface NamedFormGroup<T> extends Omit<FormGroup, Overwrites> {
  /** The value of the form */
  value: T;
  /** The aggregate value of the FormGroup, including any disabled controls. */
  getRawValue(): T;
  /** Sets the value of the FormGroup. It accepts an object
   * that matches the structure of the group, with control names as keys */
  setValue(value: T, options?: FormEventOptions): void;
  /** Patches the value of the FormGroup. It accepts an object with control names as keys,
   * and does its best to match the values to the correct controls in the group. */
  patchValue(value: T, options?: FormEventOptions): void;
  /** Observable on a value change  */
  valueChanges: Observable<T>;

  /** The controls of the form */
  controls: Record<keyof T, AbstractControl>;
  /** Replace an existing control. In a strongly-typed group,
   * the control must be in the group's type (possibly as an optional key). */
  setControl(name: keyof T, control: AbstractControl): void;
  /** Registers a control with the group's list of controls.
   * In a strongly-typed group, the control must be in the group's type
   * (possibly as an optional key). */
  registerControl(name: keyof T, control: AbstractControl): AbstractControl;
  /** Remove a control from this group. In a strongly-typed group, required controls cannot be removed. */
  removeControl(name: keyof T): void;
  /** Resets the FormGroup, marks all descendants pristine and untouched
   * and sets the value of all descendants to their default values,
   * or null if no defaults were provided. */
  reset(value?: T, options?: FormEventOptions): void;
}

/** wrap the given interface as such the keys remain the same, but the values types are unknown */
export type Like<T> = {[key in keyof T]?: unknown};

/**
 * trick to asign the strongtyped formgroup interface to a formgroup
 *
 * @param fg
 */
export const namedFormGroupParser =  <T>(fg: FormGroup) : NamedFormGroup<T> => (fg as unknown as NamedFormGroup<T>);


