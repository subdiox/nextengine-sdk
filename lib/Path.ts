import path from "path";
import Entity from "../Entity/Entity";

class Path {
  static resolve(pathOrEntity: string | Entity, suffix: string): string {
    if (typeof pathOrEntity === "string") {
      return `/api_v1_${pathOrEntity}/${suffix}`;
    } else if (suffix === "search") {
      return path.join(
        pathOrEntity.path,
        pathOrEntity.getAsInfo ? "info" : suffix
      );
    } else {
      return path.join(pathOrEntity.path, suffix);
    }
  }
}

export default Path;
