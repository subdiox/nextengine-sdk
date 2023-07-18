import Entity from "./Entity";

class ReceiveOrderOption extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_receiveorder_option";
  }
}

export default ReceiveOrderOption;
