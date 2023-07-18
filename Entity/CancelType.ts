import Entity from "./Entity";

class CancelType extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_canceltype";
  }
}

export default CancelType;
