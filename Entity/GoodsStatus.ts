import Entity from "./Entity";

class GoodsStatus extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_goodsstatus";
  }
}

export default GoodsStatus;
