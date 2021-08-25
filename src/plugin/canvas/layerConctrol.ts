import Observer from "@/plugin/observer";
import { WorkAreas } from "@/types/type.d";

export enum layerEvent {
  /**
   * 新建图层
   */
  push = 0,
  delete = 1,
  visibility = 2,
}

export enum LayerType {
  background = "background",
}

export default class LayerConctrol extends Observer<
  layerEvent,
  WorkAreas.Layer
> {
  layers: Set<WorkAreas.Layer>;

  constructor(layers: WorkAreas.Layer[] = []) {
    super();
    this.layers = new Set();
    this.init(layers);
  }

  init(layers?: WorkAreas.Layer[]) {
    layers.forEach((layer) => {
      this.push(layer);
    });
  }

  push(layer: WorkAreas.Layer) {
    this.send(layerEvent.push, layer);
    this.layers.add(layer);
  }

  delete(layer: WorkAreas.Layer) {
    this.send(layerEvent.delete, layer);
    this.layers.delete(layer);
  }

  visibility(id: number) {
    for (const iterator of this.layers) {
      if (iterator.id === id) {
        iterator.visibility = !iterator.visibility;
        this.send(layerEvent.visibility, iterator);
        return;
      }
    }
  }
}
