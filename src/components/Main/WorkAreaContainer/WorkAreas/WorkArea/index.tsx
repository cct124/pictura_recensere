import React, { useState, useEffect, useCallback } from "react";
import Style from "./index.modules.scss";
import { classNames } from '@/utils/tool';

/**
 * 工作区
 * @returns 
 */
export default function WorkArea() {


  return (
    <div className={classNames(Style.workArea, 'flex')}>

    </div>
  )
}