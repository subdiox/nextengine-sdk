import Entity from "./Entity";

class IOType extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_iotype";
  }
}

export default IOType;
