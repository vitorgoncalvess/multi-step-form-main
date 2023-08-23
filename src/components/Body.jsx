import { useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";
import iconCheck from "../../assets/images/icon-checkmark.svg";

const Body = () => {
  const { body, etapa, setForm, setEtapa } = useContext(FormContext);
  const _body = body[etapa];
  const [awnser, setAwnser] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setForm((form) => ({ ...form, ...awnser }));
    setEtapa(etapa + 1);
  }

  function handlePrev(e) {
    e.preventDefault();
    setEtapa(etapa - 1);
  }

  useEffect(() => {
    const swt = _body.QUESTIONS.find((item) => item.type === "switch");
    if (swt && !awnser.switch) {
      setAwnser({ ...awnser, [swt.type]: swt.from });
    }
  }, [_body]); //eslint-disable-line

  function handleCheck(id) {
    // eslint-disable-next-line no-prototype-builtins
    if (!awnser.hasOwnProperty("checkbox")) {
      setAwnser({ ...awnser, checkbox: [] });
      awnser.checkbox = [];
    }
    if (awnser.checkbox.includes(id)) {
      setAwnser({
        ...awnser,
        checkbox: awnser.checkbox.filter((item) => item !== id)
      });
    } else {
      setAwnser({
        ...awnser,
        checkbox: [...awnser.checkbox, id]
      });
    }
  }

  return (
    <div className="h-full relative">
      <h1 className="text-3xl font-bold text-[#03295b]">{_body.TITLE}</h1>
      <h2 className="text-sm mt-2 opacity-50">{_body.SUBTITLE}</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 mt-8"
      >
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
                      <h2 className="opacity-40 text-sm">
                        {typeof opt.subtitle === "function"
                          ? opt.subtitle(awnser)
                          : opt.subtitle}
                      </h2>
                      <h3 className="text-sm font-medium opacity-80 text-[#03295b]">
                        {typeof opt.extra === "function"
                          ? opt.extra(awnser)
                          : opt.extra}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : question.type === "switch" ? (
              <div className="flex items-center py-2 justify-center gap-4 bg-[rgb(0,0,0,0.04)] select-none">
                <span
                  className={
                    awnser[question.id] === question.from
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
                      [question.id]:
                        awnser[question.id] === question.from
                          ? question.to
                          : question.from
                    })
                  }
                  className="h-6 w-12 rounded-full bg-[#011f4d] relative flex items-center justify-center cursor-pointer"
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-white absolute transition duration-100  ${
                      awnser[question.id] === question.from
                        ? "-translate-x-3"
                        : "translate-x-3"
                    }`}
                  ></span>
                </span>
                <span
                  className={
                    awnser[question.id] === question.to
                      ? "text-[#03295b]"
                      : "opacity-50"
                  }
                >
                  {question.to}
                </span>
              </div>
            ) : question.type === "checkbox" ? (
              <div className="flex flex-col gap-2">
                {question.options.map((opt) => (
                  <div
                    onClick={() => handleCheck(opt)}
                    data-selected={awnser[question.type]?.includes(opt)}
                    className="grid grid-cols-[70px_1fr_80px] items-center border-[1px] h-20 cursor-default select-none rounded-lg data-[selected=true]:bg-[#f8f9fe] data-[selected=true]:border-[#4037fc]"
                    key={opt.title}
                  >
                    <div
                      data-selected={awnser[question.type]?.includes(opt)}
                      className="h-4 w-4 border-[1px] border-zinc-300 place-self-center flex items-center justify-center data-[selected=true]:bg-[#4037fc] data-[selected=true]:border-[#4037fc]"
                    >
                      <img src={iconCheck} alt="" />
                    </div>
                    <div>
                      <h1 className="text-[#03295b] font-semibold text-base">
                        {opt.title}
                      </h1>
                      <h2 className="text-sm opacity-50">{opt.subtitle}</h2>
                    </div>
                    <h3 className="text-[#7363df] opacity-80">
                      {typeof opt.value === "function"
                        ? opt.value(awnser)
                        : opt.value}
                    </h3>
                  </div>
                ))}
              </div>
            ) : question.type === "summary" ? (
              <div className="flex flex-col gap-8">
                <section className="flex flex-col bg-[#f8f9fe] p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-[#03295b]">
                        {question.resume.header.title(awnser)} ({awnser.switch})
                      </h1>
                      <u
                        onClick={() =>
                          setEtapa(
                            body.findIndex(
                              (item) => item.QUESTIONS[0].type === "card"
                            )
                          )
                        }
                        className="opacity-40 cursor-pointer"
                      >
                        Change
                      </u>
                    </div>
                    <div className="text-[#223755] font-medium">
                      {question.resume.header.subtitle(awnser)}
                    </div>
                  </div>
                  <span className="border-[1px] w-full h-[1px] mt-2"></span>
                  <ul className="mt-4 flex flex-col gap-4 text-sm ">
                    {question.resume.content(awnser)?.map((item) => (
                      <li
                        className="flex items-center justify-between"
                        key={item.id}
                      >
                        <h1 className="opacity-50">{item.title}</h1>
                        <h2 className="text-[#7363df] opacity-80">
                          {typeof item.value === "function"
                            ? item.value(awnser)
                            : item.value}
                        </h2>
                      </li>
                    ))}
                  </ul>
                </section>
                <div className="px-4 flex items-center justify-between">
                  <h1 className="opacity-50">
                    Total (per {awnser.switch === "Yearly" ? "year" : "month"})
                  </h1>
                  <h2 className="font-bold text-[#6666ee] text-lg">
                    {question.resume.total(awnser)}
                  </h2>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
        <button className="w-28 h-11 rounded-md bg-[#03295b] text-white absolute right-0 bottom-0">
          Next Step
        </button>
        {etapa >= 1 && (
          <button
            onClick={handlePrev}
            className="rounded-md absolute left-0 text-zinc-400 h-11 bottom-0"
          >
            Previous Step
          </button>
        )}
      </form>
    </div>
  );
};

export default Body;
