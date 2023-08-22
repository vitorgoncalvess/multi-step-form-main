import { useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";

const Body = () => {
  const { body, etapa, setForm, setEtapa } = useContext(FormContext);
  const _body = body[etapa];
  const [awnser, setAwnser] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setForm((form) => ({ ...form, ...awnser }));
    setEtapa(etapa + 1);
  }

  useEffect(() => {
    const swt = _body.QUESTIONS.find((item) => item.type === "switch");
    if (swt) {
      setAwnser({ ...awnser, [swt.type]: swt.from });
    }
  }, [_body]); //eslint-disable-line

  return (
    <div className="h-full relative">
      <h1 className="text-3xl font-bold text-[#03295b]">{_body.TITLE}</h1>
      <h2 className="text-sm mt-2 opacity-50">{_body.SUBTITLE}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        {_body.QUESTIONS.map((question, index) => (
          <div key={`question_${index}`}>
            {question.type === "input" ? (
              <div className="flex flex-col">
                <label
                  className="text-sm text-[#03295b] font-normal opacity-80"
                  htmlFor={question.label}
                >
                  {question.label}
                </label>
                <input
                  value={awnser[question.label.toLowerCase()]}
                  onChange={({ target }) =>
                    setAwnser({
                      ...awnser,
                      [question.label.toLowerCase()]: target.value
                    })
                  }
                  className="h-12 border-[1px] border-zinc-200 rounded-lg p-4 outline-none"
                  type="text"
                  id={question.label}
                  name={question.label}
                  placeholder={question.placeholder}
                />
              </div>
            ) : question.type === "card" ? (
              <div className="flex gap-4">
                {question.options.map((opt, index) => (
                  <div
                    data-selected={awnser[question.type] === opt}
                    onClick={() =>
                      setAwnser({ ...awnser, [question.type]: opt })
                    }
                    className="h-44 w-full border-[1px] border-zinc-300 rounded-lg cursor-pointer flex flex-col items-start justify-between p-4 data-[selected=true]:bg-[#f8f9fe] data-[selected=true]:border-[#7e78b3]"
                    key={index}
                  >
                    <img src={opt.img} alt="" loading="lazy" />
                    <div>
                      <h1 className="text-[#03295b] font-medium">
                        {opt.title}
                      </h1>
                      <h2 className="opacity-40 text-sm">{opt.subtitle}</h2>
                    </div>
                  </div>
                ))}
              </div>
            ) : question.type === "switch" ? (
              <div className="flex items-center py-2 justify-center gap-4 bg-[rgb(0,0,0,0.04)] select-none">
                <span
                  className={
                    awnser[question.type] === question.from
                      ? "text-[#03295b]"
                      : "opacity-50"
                  }
                >
                  {question.from}
                </span>
                <span
                  onClick={() =>
                    setAwnser({
                      ...awnser,
                      [question.type]:
                        awnser[question.type] === question.from
                          ? question.to
                          : question.from
                    })
                  }
                  className="h-6 w-12 rounded-full bg-[#011f4d] relative flex items-center justify-center cursor-pointer"
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white absolute transition duration-100  ${
                      awnser[question.type] === question.from
                        ? "-translate-x-3"
                        : "translate-x-3"
                    }`}
                  ></span>
                </span>
                <span
                  className={
                    awnser[question.type] === question.to
                      ? "text-[#03295b]"
                      : "opacity-50"
                  }
                >
                  {question.to}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
        <button className="w-28 h-11 rounded-md bg-[#03295b] text-white absolute right-0 bottom-0">
          Next Step
        </button>
      </form>
    </div>
  );
};

export default Body;
