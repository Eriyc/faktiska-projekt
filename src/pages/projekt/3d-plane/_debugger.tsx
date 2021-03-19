import { RefObject, useState } from "react";
import { useThree } from "react-three-fiber";

interface DebugInt {
  [key: string]: { name: string; id: any };
}

const useDebugger = () => {
  const [things, setThings] = useState<DebugInt>({});
  const add = (id: string, name: string) => {
    setThings((s) => {
      s[id] = { name, id };
      return s;
    });
  };

  const remove = (id: string) => {
    setThings((s) => {
      delete s[id];
      return s;
    });
  };

  return [
    things,
    {
      add,
      remove,
    },
  ];
};

const DebugScreen = () => {};
