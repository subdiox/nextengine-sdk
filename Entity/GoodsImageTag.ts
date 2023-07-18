import Entity from "./Entity";

class GoodsImageTag extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_goodsimagetag";
  }
}

export default GoodsImageTag;
