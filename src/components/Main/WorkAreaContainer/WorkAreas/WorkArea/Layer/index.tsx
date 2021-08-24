import React, { useEffect, useState } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';
import CanvasConctrol from "@/plugin/canvas/canvasConctrol";

import EyesSvg from "@/assets/svg/eyes.svg";
import { Layer } from "@/types/type.d";

/**
 * 图层
 * @returns 
 */
export default function Layer({ canvasConctrol }: { canvasConctrol: CanvasConctrol }) {

  const [layers, setLayers] = useState<Layer.LayerMeta[]>([]);

  function onClickLayer(layer: Layer.LayerMeta) {
    canvasConctrol.layer.forEach(item => {
      item.active = layer.index === item.index
    });
    setLayers([...canvasConctrol.layer]);
  }

  useEffect(() => {
    if (canvasConctrol) {
      setLayers([...canvasConctrol.layer])
    }
  }, [canvasConctrol])

  function onClickLayerVisibility(layer: Layer.LayerMeta) {
    layer.visibility = !layer.visibility;
    setLayers([...canvasConctrol.layer]);
  }

  return (
    <div className={classNames(Style.layerContainer, 'select-none')} >
      <div className={classNames(Style.header, 'border-box')}>
        <div className={classNames('mar ft-md')}>图层</div>
      </div>
      <div className={classNames(Style.layers)}>
        {
          layers.map(layer => (
            <div className={classNames(Style.layer, layer.active ? Style.activeLayer : '', 'flex-jcfs-aic pointer')} key={layer.index}>
              <div className={classNames(Style.view, 'flex-center')} onClick={() => onClickLayerVisibility(layer)}>
                {layer.visibility ? <EyesSvg /> : ""}
              </div>
              <div className={classNames(Style.right, 'ft-bs flex-jcfs-aic')} onClick={() => onClickLayer(layer)}>{layer.name}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}