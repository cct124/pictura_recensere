import React from 'react';
import system from '@/plugin/system'

export function Main() {
  system.getSysteamInfo().then(res => {
    console.log(res);
  });

  return <div><h2 >Hello from React!</h2></div>
}

