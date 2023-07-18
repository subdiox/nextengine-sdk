import Entity from "./Entity";

class ConfirmCheck extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_confirmcheck";
  }
}

export default ConfirmCheck;
