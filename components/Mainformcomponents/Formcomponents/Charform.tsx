import { Equip } from '../../Statuslist/type';
import Delete from './Delete';
import Inputform from './Inputform';
import Inputname from './Inputname';
import useDropdodoco from './useComponents/useDropdodoco';

const accept: Equip[] = ['char', 'art', 'wep'];

export default function Charform({ children, g, onDelete, id }: any) {
  const { canDrop, isOver, drop, bg } = useDropdodoco(g, id, 'char', accept);

  return (
    <div className={`ml-${2 * g}`}>
      <div className={`h-40 border border-red-400 rounded-md ${bg} transition-opacity duration-100`} ref={drop}>
        <div className="flex justify-between">
          <Inputname id={id} childid={'0'} />
          <Delete onDelete={onDelete} />
        </div>
        <div className="m-2 grid grid-cols-6 h-30">
          <Inputform label={{ ab: 300 }} id={id} childid={'1'} />
          <Inputform label={{ hb: 15000 }} id={id} childid={'2'} />
          <Inputform label={{ bb: 800 }} id={id} childid={'3'} />
          <Inputform label={{ c: 5 }} id={id} childid={'4'} />
          <Inputform label={{ d: 50 }} id={id} childid={'5'} />
          <Inputform label={{ e: 0 }} id={id} childid={'6'} />
          <Inputform label={{ n: 0, a: 24, b: 30, h: 24, hr: 1.2, ea: 15, em: 187, ac: 0, bc: 0, hc: 0 }} id={id} childid={'7'} />
          <Inputform label={{ n: 0, a: 24, b: 30, h: 24, hr: 1.2, ea: 15, em: 187, ac: 0, bc: 0, hc: 0 }} id={id} childid={'8'} />
          <Inputform label={{ n: 0, a: 24, b: 30, h: 24, hr: 1.2, ea: 15, em: 187, ac: 0, bc: 0, hc: 0, r: 20, select: 100 }} id={id} childid={'9'} />
          <Inputform label={{ n: 0, a: 24, b: 30, h: 24, hr: 1.2, ea: 15, em: 187, ac: 0, bc: 0, hc: 0, r: 20, select: 100 }} id={id} childid={'10'} />
          <Inputform label={{ ema: 1 }} id={id} childid={'11'} />
          <Inputform label={{ em: 0, a: 24, b: 30, h: 24, hr: 1.2, ea: 15 }} id={id} childid={'12'} />
        </div>
      </div>
      {children}
    </div>
  );
}
