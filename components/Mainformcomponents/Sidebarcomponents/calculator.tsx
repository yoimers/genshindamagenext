import { AllFormState, TypeTree } from '../../Statuslist/type';
import { st } from '../../Statuslist/status';
import { cloneDeep } from 'lodash';

type Input = {
  types: TypeTree[];
  status: AllFormState;
};

export default function calculator({ types, status }: Input) {
  const allcase = [];
  console.log(status);
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
  console.log(allcase);
}

function addstate(status: AllFormState, type, content) {
  Object.entries(status[type.id]).forEach(([k, v]) => {
    if (v.name === 'name') {
      content[v.name] = v.value.toString() + content[v.name];
    } else {
      content[v.name] += Number(v.value);
    }
  });
}
