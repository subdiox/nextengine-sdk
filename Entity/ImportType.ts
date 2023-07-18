import Entity from "./Entity";

class ImportType extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_importtype";
  }
}

export default ImportType;
