/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContractService } from './Contract.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contract',
  templateUrl: './Contract.component.html',
  styleUrls: ['./Contract.component.css'],
  providers: [ContractService]
})
export class ContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractId = new FormControl('', Validators.required);
  grower = new FormControl('', Validators.required);
  shipper = new FormControl('', Validators.required);
  importer = new FormControl('', Validators.required);
  arrivalDateTime = new FormControl('', Validators.required);
  unitPrice = new FormControl('', Validators.required);
  minTemperature = new FormControl('', Validators.required);
  maxTemperature = new FormControl('', Validators.required);
  minPenaltyFactor = new FormControl('', Validators.required);
  maxPenaltyFactor = new FormControl('', Validators.required);

  constructor(public serviceContract: ContractService, fb: FormBuilder) {
    this.myForm = fb.group({
      contractId: this.contractId,
      grower: this.grower,
      shipper: this.shipper,
      importer: this.importer,
      arrivalDateTime: this.arrivalDateTime,
      unitPrice: this.unitPrice,
      minTemperature: this.minTemperature,
      maxTemperature: this.maxTemperature,
      minPenaltyFactor: this.minPenaltyFactor,
      maxPenaltyFactor: this.maxPenaltyFactor
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContract.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.shipping.perishable.Contract',
      'contractId': this.contractId.value,
      'grower': this.grower.value,
      'shipper': this.shipper.value,
      'importer': this.importer.value,
      'arrivalDateTime': this.arrivalDateTime.value,
      'unitPrice': this.unitPrice.value,
      'minTemperature': this.minTemperature.value,
      'maxTemperature': this.maxTemperature.value,
      'minPenaltyFactor': this.minPenaltyFactor.value,
      'maxPenaltyFactor': this.maxPenaltyFactor.value
    };

    this.myForm.setValue({
      'contractId': null,
      'grower': null,
      'shipper': null,
      'importer': null,
      'arrivalDateTime': null,
      'unitPrice': null,
      'minTemperature': null,
      'maxTemperature': null,
      'minPenaltyFactor': null,
      'maxPenaltyFactor': null
    });

    return this.serviceContract.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractId': null,
        'grower': null,
        'shipper': null,
        'importer': null,
        'arrivalDateTime': null,
        'unitPrice': null,
        'minTemperature': null,
        'maxTemperature': null,
        'minPenaltyFactor': null,
        'maxPenaltyFactor': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.shipping.perishable.Contract',
      'grower': this.grower.value,
      'shipper': this.shipper.value,
      'importer': this.importer.value,
      'arrivalDateTime': this.arrivalDateTime.value,
      'unitPrice': this.unitPrice.value,
      'minTemperature': this.minTemperature.value,
      'maxTemperature': this.maxTemperature.value,
      'minPenaltyFactor': this.minPenaltyFactor.value,
      'maxPenaltyFactor': this.maxPenaltyFactor.value
    };

    return this.serviceContract.updateAsset(form.get('contractId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceContract.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceContract.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractId': null,
        'grower': null,
        'shipper': null,
        'importer': null,
        'arrivalDateTime': null,
        'unitPrice': null,
        'minTemperature': null,
        'maxTemperature': null,
        'minPenaltyFactor': null,
        'maxPenaltyFactor': null
      };

      if (result.contractId) {
        formObject.contractId = result.contractId;
      } else {
        formObject.contractId = null;
      }

      if (result.grower) {
        formObject.grower = result.grower;
      } else {
        formObject.grower = null;
      }

      if (result.shipper) {
        formObject.shipper = result.shipper;
      } else {
        formObject.shipper = null;
      }

      if (result.importer) {
        formObject.importer = result.importer;
      } else {
        formObject.importer = null;
      }

      if (result.arrivalDateTime) {
        formObject.arrivalDateTime = result.arrivalDateTime;
      } else {
        formObject.arrivalDateTime = null;
      }

      if (result.unitPrice) {
        formObject.unitPrice = result.unitPrice;
      } else {
        formObject.unitPrice = null;
      }

      if (result.minTemperature) {
        formObject.minTemperature = result.minTemperature;
      } else {
        formObject.minTemperature = null;
      }

      if (result.maxTemperature) {
        formObject.maxTemperature = result.maxTemperature;
      } else {
        formObject.maxTemperature = null;
      }

      if (result.minPenaltyFactor) {
        formObject.minPenaltyFactor = result.minPenaltyFactor;
      } else {
        formObject.minPenaltyFactor = null;
      }

      if (result.maxPenaltyFactor) {
        formObject.maxPenaltyFactor = result.maxPenaltyFactor;
      } else {
        formObject.maxPenaltyFactor = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'contractId': null,
      'grower': null,
      'shipper': null,
      'importer': null,
      'arrivalDateTime': null,
      'unitPrice': null,
      'minTemperature': null,
      'maxTemperature': null,
      'minPenaltyFactor': null,
      'maxPenaltyFactor': null
      });
  }

}
