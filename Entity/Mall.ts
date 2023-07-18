import Entity from "./Entity";

class Mall extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_system_mall";
  }
}

export default Mall;
