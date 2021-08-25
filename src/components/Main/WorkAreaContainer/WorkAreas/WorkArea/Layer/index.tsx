import React, { useEffect, useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import LayerConctrol from "@/plugin/canvas/layerConctrol";

import EyesSvg from "@/assets/svg/eyes.svg";
import { WorkAreas } from "@/types/type.d";

/**
 * 图层
 * @returns 
 */
export default function Layers({ canvasConctrol }: { canvasConctrol: LayerConctrol }) {

  const [layers, setLayers] = useState<WorkAreas.Layer[]>([]);

  function onClickLayer(layer: WorkAreas.Layer) {
    canvasConctrol.layers.forEach(item => {
      item.active = layer.id === item.id
    });
    setLayers([...canvasConctrol.layers]);
  }

  useEffect(() => {
    if (canvasConctrol) {
      setLayers([...canvasConctrol.layers])
    }
  }, [canvasConctrol])

  function onClickLayerVisibility(layer: WorkAreas.Layer) {
    layer.visibility = !layer.visibility;
    setLayers([...canvasConctrol.layers]);
  }

  return (
    <div className={classNames(Style.layerContainer, 'select-none')} >
      <div className={classNames(Style.header, 'border-box')}>
        <div className={classNames('mar ft-bs')}>图层</div>
      </div>
      <div className={classNames(Style.layers)}>
        {
          layers.map(layer => (
            <div className={classNames(Style.layer, layer.active ? Style.activeLayer : '', 'flex-jcfs-aic pointer')} key={layer.id}>
              <div className={classNames(Style.view, 'flex-center')} onClick={() => onClickLayerVisibility(layer)}>
                {layer.visibility ? <EyesSvg /> : ""}
              </div>
              <div className={classNames(Style.right, 'ft-sm flex-jcfs-aic')} onClick={() => onClickLayer(layer)}>{layer.name}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}