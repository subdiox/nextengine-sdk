import Entity from "./Entity";

class CustomerType extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_customertype";
  }
}

export default CustomerType;
