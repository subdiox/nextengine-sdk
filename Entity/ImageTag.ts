import Entity from "./Entity";

class ImageTag extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_system_imagetag";
  }
}

export default ImageTag;
