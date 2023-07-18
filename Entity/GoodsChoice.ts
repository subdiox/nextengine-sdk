import Entity from "./Entity";

class GoodsChoice extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_select";
  }
}

export default GoodsChoice;
