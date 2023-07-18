import Entity from "./Entity";

class GoodsTag extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_goodstag";
  }
}

export default GoodsTag;
