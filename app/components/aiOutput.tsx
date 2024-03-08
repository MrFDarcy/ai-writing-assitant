"use client";

import { useState, useEffect, use } from "react";
import gemini from "../utils/gemini";

type GeminiResponse = {
  outputText: string;
  status: string;
};

export default function AiOutput({
  text,
  isSubmit,
  setIsSubmit,
  selectedOption,
}: {
  text: string;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  selectedOption: string;
}) {
  const [resp, setResp] = useState<GeminiResponse>({
    outputText: "",
    status: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      getOutput();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  const getOutput = async () => {
    setLoading(true);

    const result = await gemini(text, selectedOption);

    const resp: GeminiResponse = {
      outputText: result.outputText,
      status: result.status,
    };

    setResp(resp);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 ">
      {/* div at far right */}
      <div className="flex justify-end w-full ">
        {loading ? (
          ""
        ) : resp.status === "success" ? (
          <button
            onClick={() => {
              navigator.clipboard.writeText(resp.outputText);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
            className="p-2 bg-[color:var(--accent)]  hover:bg-[color:var(--accent-hover)]  text-[color:var(--text-dark) 
            focus:outline-none focus:ring-2 focus:ring-[color:var(--text-dark)] font-medium rounded-xl text-md px-3 py-2 text-center me-2 mb-2"
          >
            <div className="flex items-center justify-center h-5">
              {copied ? (
                <div>
                  <Textcopied />
                </div>
              ) : (
                <svg
                  className="w-4 h-4"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="w-full p-4 bg-transperent   text-[color:var(--text-light)] rounded-lg border-none focus:outline-none">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-t-2  text-[color:var(--text-light)] rounded-full animate-spin"></div>
          </div>
        ) : resp.status === "userInputError" ||
          resp.status === "internalError" ? (
          <div className="text-[color:var(--alert)]">{resp.outputText}</div>
        ) : (
          <div className=" text-[color:var(--text-light])">
            {resp.outputText}
          </div>
        )}
      </div>
    </div>
  );
}

const Textcopied = () => {
  return (
    <div className="text-[color:var(--text-dark)] ">
      <svg
        className="w-4 h-4"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
