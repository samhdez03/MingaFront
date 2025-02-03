import thumbUp from "../../assets/pulgarArriba.png";
import thumbDown from "../../assets/pulgarAbajo-removebg-preview.png";
import surprise from "../../assets/emojiSorpresa.webp";
import hearthEyes from "../../assets/coras-removebg-preview.png";
import { reactionsCreate } from "../../store/actions/reactionsCreateActions";
import { reactionsAll } from "../../store/actions/reactionsAllActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode } from '../../store/actions/darkModeActions';

function ChapterInfo({ name, author, category, mangaId }) {
  const { reactions } = useSelector((state) => state.reactions);
  const isDarkMode = useSelector(selectIsDarkMode);
  const autorId = JSON.parse(localStorage.getItem("user"));
  const validAuthorCompany = autorId.company_id || autorId.author_id;

  const [selectedValue, setSelectedValue] = useState(null);

  let reactionsFiltered = reactions?.filter((m) => m?.manga_id?._id==mangaId && (m?.author_id||m?.company_id) == validAuthorCompany);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reactionsAll()); 
  }, [dispatch]);

  useEffect(() => {
    if (reactionsFiltered.length > 0) {
      setSelectedValue(reactionsFiltered[0]?.reaction); 
    }
  }, [reactions]);

  const handleRadioChange = (value) => {
    setSelectedValue(selectedValue === value ? null : value); 
  };

  useEffect(() => {
    const dataCreate = {
      manga_id: mangaId,
      author_id: autorId.author_id,
      company_id: autorId.company_id,
      reaction: selectedValue,
    };
    
    setTimeout(() => {
      dispatch(reactionsCreate({ dataCreate }));
      },500)


    
    }, [selectedValue, mangaId,autorId, dispatch]);
  return (
    <>
      <div className="titleCatBox">
        <p className={`maxTablets font-montserrat font-normal text-[30px] leading-[28px] py-2
          transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
          {name}
        </p>
        <div className="categoryBox flex justify-between w-full maxTablets">
          <button
            value="Shonen"
            className={`${category} px-3 h-9 rounded-full font-montserrat font-medium text-xs
              transition-colors duration-300`}
          >
            {category}
          </button>
          <p className={`px-[5px] py-[8.5px] font-montserrat font-medium text-[16px]
            transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {author}
          </p>
        </div>
      </div>
      
      <div className="estRadBox">
        <div className="flex items-center gap-2 w-full justify-center pt-4 maxTablets radios">
          <label className="custom-radio">
            <input
              type="radio"
              name="opcion"
              value="like"
              checked={selectedValue === "like"}
              onClick={() => handleRadioChange("like")}
            />
            <span className={`circle transition-colors duration-300 
              ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
              <img src={thumbUp} alt="Pulgar arriba" />
            </span>
          </label>
          <label className="custom-radio">
            <input
              type="radio"
              name="opcion"
              value="dislike"
              checked={selectedValue === "dislike"}
              onClick={() => handleRadioChange("dislike")}
            />
            <span className={`circle transition-colors duration-300 
              ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
              <img src={thumbDown} alt="Pulgar abajo" />
            </span>
          </label>
          <label className="custom-radio">
            <input
              type="radio"
              name="opcion"
              value="amazing"
              checked={selectedValue === "amazing"}
              onClick={() => handleRadioChange("amazing")}
            />
            <span className={`circle transition-colors duration-300 
              ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
              <img src={surprise} alt="Emoji sorpresa" />
            </span>
          </label>
          <label className="custom-radio">
            <input
              type="radio"
              name="opcion"
              value="love"
              checked={selectedValue === "love"}
              onClick={() => handleRadioChange("love")}
            />
            <span className={`circle transition-colors duration-300 
              ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
              <img src={hearthEyes} alt="Emoji ojos de corazón" />
            </span>
          </label>
        </div>

        <div className={`estadisticBox w-full shadow-[0_2px_7px_0px_rgba(0,0,0,0.15)] 
          rounded-[20px] h-[60px] flex mt-[1.2rem] p-2 items-center justify-center maxTablets
          transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 dark:shadow-[0_2px_7px_0px_rgba(0,0,0,0.3)]' : 'bg-white'}`}>
          <div className="w-[33.5%]">
            <p className={`font-montserrat text-[18px] font-normal h-[1.2rem] text-center
              transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-[#424242]'}`}>
              4.5/5
            </p>
            <p className={`font-montserrat text-[10px] font-normal text-center
              transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#9D9D9D]'}`}>
              Rating
            </p>
          </div>
          <div className={`w-[33.5%] border-l border-r transition-colors duration-300
            ${isDarkMode ? 'border-gray-600' : 'border-[#9D9D9D]'}`}>
            <p className={`font-montserrat text-[18px] font-normal h-[1.2rem] text-center
              transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-[#424242]'}`}>
              265
            </p>
            <p className={`font-montserrat text-[10px] font-normal text-center
              transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#9D9D9D]'}`}>
              Chapters
            </p>
          </div>
          <div className="w-[33.5%]">
            <p className={`font-montserrat text-[18px] font-normal h-[1.2rem] text-center
              transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-[#424242]'}`}>
              Eng
            </p>
            <p className={`font-montserrat text-[10px] font-normal text-center
              transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-[#9D9D9D]'}`}>
              Language
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { ChapterInfo };