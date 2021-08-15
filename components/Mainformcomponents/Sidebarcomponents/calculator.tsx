import { AllFormState, Status, StatusName, TypeSubTree, TypeTree } from '../../Statuslist/type';
import { st } from '../../Statuslist/status';
import { cloneDeep } from 'lodash';

type Input = {
  types: TypeTree[];
  status: AllFormState;
};

export default function calculator({ types, status }: Input): Status[] {
  const newtypes = addsibilingNode(types);
  const allcase = getallcase(status, newtypes);
  return allcase;
}

function addsibilingNode(types: TypeTree[]): TypeTree[] {
  const newtypes = cloneDeep(types);

  newtypes.forEach((type0) => {
    type0.children.forEach((type1, index) => {
      if (type1.children.length === 0) {
        type0.children.slice(index + 1).forEach((type, i) => {
          if (type.children.length) {
            type1.children.push(...type.children);
          }
        });
      }
    });
  });

  newtypes.forEach((type0, index) => {
    if (type0.children.length === 0) {
      newtypes.slice(index + 1).forEach((type, i) => {
        if (type.children && type.children.length) {
          type0.children.push(...type.children);
        }
      });
    }
  });

  return cloneDeep(newtypes);
}

function getallcase(status: AllFormState, types: TypeTree[]): Status[] {
  const allcase = [];
  types.forEach((type0) => {
    type0.children.forEach((type1) => {
      type1.children.forEach((type2) => {
        const content = cloneDeep(st);
        addstate(status, type2, content);
        addstate(status, type1, content);
        addstate(status, type0, content);
        allcase.push(content);
      });
    });
  });
  return allcase;
}

function addstate(status: AllFormState, type: TypeTree | TypeSubTree, content: StatusName[]) {
  Object.entries(status[type.id]).forEach(([k, v]) => {
    if (v.name === 'name') {
      content[v.name] = v.value.toString() + content[v.name];
    } else {
      content[v.name] += Number(v.value);
    }
  });
}
