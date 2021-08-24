import Observer from "@/plugin/observer";
import { WorkAreas } from "@/types/type.d";

export enum LayerEvent {
  /**
   * 新建图层
   */
  push = 0,
  delete = 0,
}

export default class LayerConctrol extends Observer<
  LayerEvent,
  WorkAreas.Layer
> {
  layer: Set<WorkAreas.Layer>;

  constructor() {
    super();
    this.layer = new Set();
  }

  push(layer: WorkAreas.Layer) {
    this.send(LayerEvent.push, layer);
    this.layer.add(layer);
  }

  delete(layer: WorkAreas.Layer) {
    this.send(LayerEvent.delete, layer);
    this.layer.delete(layer);
  }
}
