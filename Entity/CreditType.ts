import Entity from "./Entity";

class CreditType extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_credittype";
  }
}

export default CreditType;
