import Entity from "./Entity";

class PageVariationOrOption extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_pagebasevariationoroption";
  }
}

export default PageVariationOrOption;
