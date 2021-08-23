import React, { useContext, useEffect, useReducer, useState } from 'react';
import { CharArtWepAction, CharArtWepFormState, Equip } from '../../Statuslist/type';
import { StructureContext, AllFormContext } from '../Main';
import createchangecharartwepaction from '../Statuscontrols/createchangecharartwepaction';
import Delete from './Delete';
import Inputform from './Inputform';
import Inputname from './Inputname';
import useDragdodoco from './useComponents/useDragdodoco';
import useDropdodoco from './useComponents/useDropdodoco';
import { useSpring, animated } from 'react-spring';
import ABHPrateform from './ABHPrateform';

const accept: Equip[] = ['char', 'art', 'wep'];
export default function Artifactform({ children, g, id }: any) {
  const { canDrop, isOver, drop, bg } = useDropdodoco(g, id, 'art', accept);
  const { types, dispatch } = useContext(StructureContext);
  const { status, statusdispatch } = useContext(AllFormContext);
  const { isDragging, drag } = useDragdodoco('art', id, false, dispatch, statusdispatch);

  const [open, toggle] = useState(false);
  const props = useSpring({
    to: { opacity: open ? 0 : 1, scale: open ? 0.8 : 1 },
    from: { opacity: open ? 1 : 0, scale: open ? 1 : 0.8 },
    reset: false,
    delay: 100,
  });

  return (
    <animated.div style={props}>
      <div className={`ml-2`}>
        <div
          className={`h-40 border border-yellow-500 rounded-md ${bg} transition-opacity duration-100`}
          ref={drop}
        >
          <div ref={drag}>
            <div className="flex justify-between">
              <Inputname id={id} childid={'0'} />
              <Delete id={id} toggle={toggle} />
            </div>
            <div className="m-2 grid grid-cols-6 h-30">
              <Inputform label={{ hc: 4780 }} id={id} childid={'1'} />
              <Inputform label={{ ac: 311 }} id={id} childid={'2'} />
              <Inputform label={{ a: 46.6, b: 58.3, h: 46.6, em: 187 }} id={id} childid={'3'} />
              <Inputform
                label={{ e: 46.6, a: 46.6, b: 58.3, h: 46.6, em: 187 }}
                id={id}
                childid={'4'}
              />
              <Inputform
                label={{ c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, em: 187 }}
                id={id}
                childid={'5'}
              />
              <Inputform
                label={{ n: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 46.6, em: 187 }}
                id={id}
                childid={'6'}
              />
              <Inputform
                label={{ e: 15, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, em: 187 }}
                id={id}
                childid={'7'}
              />
              <Inputform
                label={{ ea: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 15, em: 187 }}
                id={id}
                childid={'8'}
              />
              <Inputform
                label={{ n: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 15, em: 187 }}
                id={id}
                childid={'9'}
              />
              <Inputform
                label={{ n: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 15, em: 187 }}
                id={id}
                childid={'10'}
              />
              <Inputform
                label={{ n: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 15, em: 187 }}
                id={id}
                childid={'11'}
              />
              {g === 2 && <ABHPrateform id={id} childid={'12'} />}
            </div>
          </div>
        </div>
        {children}
      </div>
    </animated.div>
  );
}
