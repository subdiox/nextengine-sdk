import Entity from "./Entity";

class GoodsImage extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_goodsimage";
  }
}

export default GoodsImage;
