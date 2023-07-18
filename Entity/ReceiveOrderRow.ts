import Entity from "./Entity";

class ReceiveOrderRow extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_receiveorder_row";
  }
}

export default ReceiveOrderRow;
