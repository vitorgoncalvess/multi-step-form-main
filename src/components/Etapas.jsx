/* eslint-disable react/prop-types */

import { useContext } from "react";
import { FormContext } from "./Form";

const Etapas = ({ type }) => {
  const { body, etapa } = useContext(FormContext);
  return (
    <div className="flex flex-col items-center">
      <ul className={`flex ${type === "col" && "flex-col"} gap-8`}>
        {body.map((item, index) => (
          <li className={`flex gap-4`} key={`step_${index}`}>
            <span
              data-on={etapa === index}
              className="border-[1px] border-white text-white font-semibold rounded-full h-9 w-9 flex items-center justify-center data-[on=true]:text-black data-[on=true]:bg-[#bee2fb] data-[on=true]:border-[#bee2fb]"
            >
              {index + 1}
            </span>
            {type === "col" && (
              <div className="text-white font-semibold select-none text-[12px] flex flex-col items-start justify-between tracking-widest">
                <h1 className="opacity-70">STEP {index + 1}</h1>
                <h2 className="font-[700]">
                  {item.NAME ? item.NAME.toUpperCase() : item.TITLE}
                </h2>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Etapas;
