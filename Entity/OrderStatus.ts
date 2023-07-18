import Entity from "./Entity";

class OrderStatus extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_orderstatus";
  }
}

export default OrderStatus;
