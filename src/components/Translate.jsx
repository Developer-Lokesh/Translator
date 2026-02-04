import languages from '../languages';
import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
// import { Mic } from 'lucide-react';

const Translate = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [fromLanguage, setFromLanguage] = useState("")
    const [toLanguage, setToLanguage] = useState(languages["hi"])
    const [fromlangCode, setFromLangCode] = useState("en");
    const [tolangCode, setToLangCode] = useState("hi");
    const [char, setChar] = useState(0);
    const maxChar = 300;

    const switchLanguage = () => {
        // language swap
        const temp = fromLanguage
        setFromLanguage(toLanguage);
        setToLanguage(temp);

        // language code swap
        const tempCode = fromlangCode;
        setFromLangCode(tolangCode);
        setToLangCode(tempCode);
    }

    const fromlanguageHandler = (e) => {
        const selectFrom = e.target.value;
        setFromLangCode(selectFrom);
        setFromLanguage(languages[selectFrom]);
    }

    const tolanguageHandler = (e) => {
        const selectTo = e.target.value;
        setToLangCode(selectTo);
        setToLanguage(languages[selectTo]);
    }

    const inputHandler = (e) => {
        const value = e.target.value.slice(0, maxChar);

        setText(value);
        setChar(value.length)

    }

    const translateBtnHandler = async () => {
        try {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromlangCode}|${tolangCode}`);
            const data = await res.json();
            setResult(data.responseData.translatedText);
        } catch (error) {
            console.log(error);
            setResult(error)
        }
    }



    return (
        <div className='bg-black flex flex-col justify-center items-center rounded-3xl'>
            <h1 className="text-9xl bebas font-bold p-4 text-center italic text-white ">Translator </h1>
            <div className="flex  gap-4 w-[calc(100%-10%)]  items-center justify-center p-4 ">
                <div className="flex gap-5 justify-center-safe p-4 bg-[#232b2b] rounded-2xl">
                    <p className="text-5xl italic text-white lobsterScript ">from  </p>

                    <select value={fromlangCode} onChange={fromlanguageHandler} className='p-4 border-gray-400 border-2 rounded-2xl text-white'>
                        {Object.entries(languages).map(([code, lang]) => (
                            <option key={code} value={code} className='bg-[#3b444b] text-white  scrollbar-hide '>{lang}</option>
                        ))}
                    </select>

                </div>

                <button onClick={switchLanguage} className='bg-white p-6 rounded-full graybg text-red-600'><ArrowRightLeft width={40} height={40} /></button>

                <div className="flex gap-5  bg-[#232b2b] justify-center-safe p-4 rounded-2xl">
                    <p className="text-5xl italic text-white oleo">to</p>

                    <select value={tolangCode} onChange={tolanguageHandler} className='p-4 border-gray-400 border-2 rounded-2xl text-white'>
                        {Object.entries(languages).map(([code, lang]) => (
                            <option key={code} value={code} className='bg-[#3b444b] text-white  scrollbar-hide '>{lang}</option>
                        ))}
                    </select>

                </div>
            </div>

            <textarea onChange={inputHandler} value={text} cols="50" rows="10" className="border w-[calc(100%-10%)] textScript mt-10 rounded-3xl bg-[#232b2b] outline-none p-4 text-white text-4xl" />
            <div className='flex w-[calc(100%-15%)] justify-end items-end'><p className='text-3xl text-gray-400 mt-2 animation' >{char}/{maxChar}</p></div>
            {/* <button className='bg-white mt-10 p-6 w-[calc(100%-10%)] border-4 border-red-500 graybg rounded-2xl text-3xl font-bold flex items-center justify-center'><Mic width={50} height={50}/> Tap to speak</button> */}
            <button onClick={translateBtnHandler} className='bg-white mt-10 p-6 w-[calc(100%-10%)] rounded-2xl text-3xl font-bold'>Translate</button>
            <textarea value={result} cols="50" rows="10" className="border w-[calc(100%-10%)] bg-[#232b2b] rounded-3xl mt-14 mb-10 outline-none p-4 text-white text-4xl" readOnly />

        </div>
    )
}

export default Translate
