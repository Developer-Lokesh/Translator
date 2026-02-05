import languages from '../languages';
import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

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
        const temp = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(temp);

        const tempCode = fromlangCode;
        setFromLangCode(tolangCode);
        setToLangCode(tempCode);
    };

    const inputHandler = (e) => {
        const value = e.target.value.slice(0, maxChar);
        setText(value);
        setChar(value.length);
    };

    const translateBtnHandler = async () => {
        const res = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromlangCode}|${tolangCode}`
        );
        const data = await res.json();
        setResult(data.responseData.translatedText);
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-9xl font-bold italic text-white mt-6 text-center">
                Translator
            </h1>

            <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl justify-center items-center mt-6">

                <div className="flex gap-3 bg-[#232b2b] p-4 rounded-2xl w-full md:w-auto">
                    <p className="text-xl md:text-3xl text-white italic">From</p>
                    <select
                        value={fromlangCode}
                        onChange={(e) => setFromLangCode(e.target.value)}
                        className="flex-1 bg-transparent border-2 border-gray-400 rounded-xl p-2 text-white"
                    >
                        {Object.entries(languages).map(([code, lang]) => (
                            <option key={code} value={code} className="bg-[#3b444b]">
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={switchLanguage}
                    className="bg-white p-4 rounded-full text-red-600"
                >
                    <ArrowRightLeft size={28} />
                </button>

                <div className="flex gap-3 bg-[#232b2b] p-4 rounded-2xl w-full md:w-auto">
                    <p className="text-xl md:text-3xl text-white italic">To</p>
                    <select
                        value={tolangCode}
                        onChange={(e) => setToLangCode(e.target.value)}
                        className="flex-1 bg-transparent border-2 border-gray-400 rounded-xl p-2 text-white"
                    >
                        {Object.entries(languages).map(([code, lang]) => (
                            <option key={code} value={code} className="bg-[#3b444b]">
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <textarea
                value={text}
                onChange={inputHandler}
                rows="6"
                className="w-full max-w-6xl mt-8 p-4 rounded-2xl bg-[#232b2b] text-white text-lg md:text-2xl outline-none"
            />

            <div className="w-full max-w-6xl text-right text-gray-400">
                {char}/{maxChar}
            </div>

            <button
                onClick={translateBtnHandler}
                className="bg-white mt-6 w-full max-w-6xl py-4 rounded-2xl text-xl font-bold"
            >
                Translate
            </button>

            <textarea
                value={result}
                readOnly
                rows="6"
                className="w-full max-w-6xl mt-8 mb-10 p-4 rounded-2xl bg-[#232b2b] text-white text-lg md:text-2xl outline-none"
            />
        </div>
    );
};

export default Translate;

