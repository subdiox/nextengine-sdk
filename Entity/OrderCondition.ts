import Entity from "./Entity";

class OrderCondition extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_ordercondition";
  }
}

export default OrderCondition;
