import Entity from "./Entity";

class DeliveryDate extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_deliverydate";
  }
}

export default DeliveryDate;
