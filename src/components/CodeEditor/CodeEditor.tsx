import { useEffect, useState } from 'react';

export default function CodeEditor() {
  const [code, setCode] = useState(`// Language: typescript`);
  const [linesCount, setLinesCount] = useState(code.split('\n'));

  const codeChanged = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    setLinesCount(code.split('\n'));
    return () => {};
  }, [code]);

  return (
    <div className='w-full h-72 flex flex-wrap overflow-scroll'>
      <div className='bg-zinc-800 py-4 pl-6 pr-6 rounded-l-xl border-l-2 border-y-2 border-slate-200 outline-none w-10 h-full text-zinc-400'>
        {linesCount.map((line, index) => (
          <div className='w-full' key={index + 1}>
            {index + 1}
          </div>
        ))}
      </div>
      <textarea
        className='bg-zinc-800 py-4 pr-4 rounded-r-xl border-r-2 border-y-2 border-slate-200 outline-none h-full'
        onChange={(e) => codeChanged(e.target.value)}
      ></textarea>
    </div>
  );
}
