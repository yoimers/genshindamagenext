import { useContext, useEffect, useState } from 'react';
import { Equip } from '../../Statuslist/type';
import { StructureContext, AllFormContext } from '../Main';
import Delete from './Delete';
import Inputform from './Inputform';
import Inputname from './Inputname';
import useDragdodoco from './useComponents/useDragdodoco';
import useDropdodoco from './useComponents/useDropdodoco';
import { useSpring, animated } from 'react-spring';

const accept: Equip[] = ['char', 'art', 'wep'];

export default function Charform({ children, g, id }: any) {
  const { canDrop, isOver, drop, bg } = useDropdodoco(g, id, 'char', accept);
  const { types, dispatch } = useContext(StructureContext);
  const { status, statusdispatch } = useContext(AllFormContext);
  const { isDragging, drag } = useDragdodoco('char', id, false, dispatch, statusdispatch);

  const [open, toggle] = useState(false);
  const props = useSpring({
    to: { opacity: open ? 0 : 1, scale: open ? 0.8 : 1 },
    from: { opacity: open ? 1 : 0, scale: open ? 1 : 0.8 },
    reset: false,
    delay: 0,
  });
  useEffect(() => {
    return () => {
      statusdispatch({ action: 'deletecharartwepaction', id });
    };
  }, []);
  return (
    <animated.div style={props}>
      <div className={`ml-0`}>
        <div
          className={`h-40 border border-red-400 rounded-md ${bg} transition-opacity duration-100`}
          ref={drop}
        >
          <div ref={drag}>
            <div className="flex justify-between">
              <Inputname id={id} childid={'0'} />
              <Delete id={id} toggle={toggle} />
            </div>
            <div className="m-2 grid grid-cols-6 h-30">
              <Inputform label={{ ab: 300 }} id={id} childid={'1'} />
              <Inputform label={{ hb: 15000 }} id={id} childid={'2'} />
              <Inputform label={{ bb: 800 }} id={id} childid={'3'} />
              <Inputform label={{ c: 5 }} id={id} childid={'4'} />
              <Inputform label={{ d: 50 }} id={id} childid={'5'} />
              <Inputform label={{ e: 0 }} id={id} childid={'6'} />
              <Inputform
                label={{ n: 0, a: 24, b: 30, h: 24, hr: 1.2, ea: 15, em: 187, ac: 0, bc: 0, hc: 0 }}
                id={id}
                childid={'7'}
              />
              <Inputform
                label={{ n: 0, a: 24, b: 30, h: 24, hr: 1.2, ea: 15, em: 187, ac: 0, bc: 0, hc: 0 }}
                id={id}
                childid={'8'}
              />
              <Inputform
                label={{
                  n: 0,
                  a: 24,
                  b: 30,
                  h: 24,
                  hr: 1.2,
                  ea: 15,
                  em: 187,
                  ac: 0,
                  bc: 0,
                  hc: 0,
                  r: 20,
                }}
                id={id}
                childid={'9'}
              />
              <Inputform label={{ select: 100 }} id={id} childid={'10'} />
              <Inputform label={{ ema: 1 }} id={id} childid={'11'} />
              <Inputform label={{ em: 0 }} id={id} childid={'12'} />
            </div>
          </div>
        </div>
        {children}
      </div>
    </animated.div>
  );
}
