import Entity from "./Entity";

class ForwardingMethod extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_forwardingmethod";
  }
}

export default ForwardingMethod;
