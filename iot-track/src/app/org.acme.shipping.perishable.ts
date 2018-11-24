import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.shipping.perishable{
   export enum ProductType {
      BANANAS,
      APPLES,
      PEARS,
      PEACHES,
      COFFEE,
   }
   export enum ShipmentStatus {
      CREATED,
      IN_TRANSIT,
      ARRIVED,
   }
   export enum CompassDirection {
      N,
      S,
      E,
      W,
   }
   export abstract class ShipmentTransaction extends Transaction {
      shipment: Shipment;
   }
   export class TemperatureReading extends ShipmentTransaction {
      centigrade: number;
   }
   export class GpsReading extends ShipmentTransaction {
      readingTime: string;
      readingDate: string;
      latitude: string;
      latitudeDir: CompassDirection;
      longitude: string;
      longitudeDir: CompassDirection;
   }
   export class ShipmentReceived extends ShipmentTransaction {
      receivedDateTime: Date;
   }
   export class ShipmentPacked extends ShipmentTransaction {
   }
   export class ShipmentPickup extends ShipmentTransaction {
   }
   export class ShipmentLoaded extends ShipmentTransaction {
   }
   export class Shipment extends Asset {
      shipmentId: string;
      type: ProductType;
      status: ShipmentStatus;
      unitCount: number;
      temperatureReadings: TemperatureReading[];
      gpsReadings: GpsReading[];
      contract: Contract;
      shipmentPacked: ShipmentPacked;
      shipmentPickup: ShipmentPickup;
      shipmentLoaded: ShipmentLoaded;
      shipmentReceived: ShipmentReceived;
   }
   export class Contract extends Asset {
      contractId: string;
      grower: Grower;
      shipper: Shipper;
      importer: Importer;
      arrivalDateTime: Date;
      unitPrice: number;
      minTemperature: number;
      maxTemperature: number;
      minPenaltyFactor: number;
      maxPenaltyFactor: number;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export abstract class Business extends Participant {
      email: string;
      address: Address;
      accountBalance: number;
   }
   export class Grower extends Business {
   }
   export class Shipper extends Business {
   }
   export class Importer extends Business {
   }
   export abstract class IoTDevice extends Participant {
      deviceId: string;
   }
   export class TemperatureSensor extends IoTDevice {
   }
   export class GpsSensor extends IoTDevice {
   }
   export class TemperatureThresholdEvent extends Event {
      message: string;
      temperature: number;
      shipment: Shipment;
   }
   export class ShipmentInPortEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class ShipmentPackedEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class ShipmentPickupEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class ShipmentLoadedEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class ShipmentReceivedEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class SetupDemo extends Transaction {
   }
// }
