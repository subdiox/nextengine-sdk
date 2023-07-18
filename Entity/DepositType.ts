import Entity from "./Entity";

class DepositType extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_deposittype";
  }
}

export default DepositType;
