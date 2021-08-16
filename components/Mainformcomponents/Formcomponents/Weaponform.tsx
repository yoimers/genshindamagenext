import React, { useContext, useReducer, useState } from 'react';
import { CharArtWepAction, CharArtWepFormState, Equip } from '../../Statuslist/type';
import { StructureContext, AllFormContext } from '../Main';
import Delete from './Delete';
import Inputform from './Inputform';
import Inputname from './Inputname';
import useDragdodoco from './useComponents/useDragdodoco';
import useDropdodoco from './useComponents/useDropdodoco';
import { useSpring, animated } from 'react-spring';
import ABHPrateform from './ABHPrateform';

const accept: Equip[] = ['char', 'art', 'wep'];

export default function Weaponform({ children, g, id }: any) {
  const { canDrop, isOver, drop, bg } = useDropdodoco(g, id, 'wep', accept);
  const { types, dispatch } = useContext(StructureContext);
  const { status, statusdispatch } = useContext(AllFormContext);
  const { isDragging, drag } = useDragdodoco('wep', id, false, dispatch, statusdispatch);

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
          className={`h-25 border border-blue-600 rounded-md ${bg} transition-opacity duration-100`}
          ref={drop}
        >
          <div ref={drag}>
            <div className="flex justify-between">
              <Inputname id={id} childid={'0'} />
              <Delete id={id} toggle={toggle} />
            </div>
            <div className="m-2 grid grid-cols-6 h-30">
              <Inputform label={{ ab: 674 }} id={id} childid={'1'} />
              <Inputform
                label={{ c: 22.1, d: 66.2, a: 49.6, b: 58.3, h: 46.6, e: 20, em: 165, hr: 1.2 }}
                id={id}
                childid={'2'}
              />
              <Inputform
                label={{
                  n: 0,
                  c: 22.1,
                  d: 66.2,
                  a: 49.6,
                  b: 58.3,
                  h: 46.6,
                  e: 20,
                  em: 165,
                  hr: 1.2,
                }}
                id={id}
                childid={'3'}
              />
              <Inputform
                label={{
                  n: 0,
                  c: 22.1,
                  d: 66.2,
                  a: 49.6,
                  b: 58.3,
                  h: 46.6,
                  e: 20,
                  em: 165,
                  hr: 1.2,
                }}
                id={id}
                childid={'4'}
              />
              <Inputform
                label={{
                  n: 0,
                  c: 22.1,
                  d: 66.2,
                  a: 49.6,
                  b: 58.3,
                  h: 46.6,
                  e: 20,
                  em: 165,
                  hr: 1.2,
                }}
                id={id}
                childid={'5'}
              />
              {g === 2 && <ABHPrateform id={id} childid={'6'} />}
            </div>
          </div>
        </div>
        {children}
      </div>
    </animated.div>
  );
}
