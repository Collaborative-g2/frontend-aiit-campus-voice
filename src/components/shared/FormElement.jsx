import PropTypes from "prop-types";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const ACV_API_BASE_URL = import.meta.env.VITE_ACV_API_BASE_URL;

const FormElement = ({
  type,
  label,
  placeholder,
  options,
  fieldRef,
  hasError,
}) => {
  const classes =
    "form-control w-full px-3 py-1.5 text-gray-700 rounded border border-solid border-gray-300 focus:border focus:outline-secondary";

  const renderInputField = () => {
    switch (type) {
      case "input": {
        const [inputValue, setInputValue] = useState("");
        const [suggestions, setSuggestions] = useState([]);
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

        const handleInputChange = async (e) => {
          const value = e.target.value;
          setInputValue(value);

          if (value) {
            try {
              const response = await axios.get(`${ACV_API_BASE_URL}/Prod/subjects/`, {
                params: { q: value },
              });

              // The subject suggestion list is limited to 10 items.
              setSuggestions(response.data.slice(0, 10));
              setShowSuggestions(true);
            } catch (error) {
              console.error("Error fetching suggestions:", error);
              setSuggestions([]);
              setShowSuggestions(false);
            }
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        };

        const handleOptionClick = (suggestion) => {
          fieldRef.onChange(suggestion.subject_id);
          setIsSuggestionSelected(true);
          setInputValue(suggestion.subject_name);
          setShowSuggestions(false);
          setSuggestions([]);
        };

        const handleBlur = () => {
          if (isSuggestionSelected) {
            setIsSuggestionSelected(false);
          } else {
            setInputValue("");
            setShowSuggestions(false);
          }
        };

        return (
          <>
            <input
              className={classes}
              type={type}
              placeholder={placeholder}
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={inputValue}
            />
            {showSuggestions && (
              <ul className="relative bg-white border mt-1 max-h-60 overflow-y-auto">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleOptionClick(suggestion);
                      }}
                    >
                      {suggestion.subject_name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No suggestions found</li>
                )}
              </ul>
            )}
          </>
        );
      }
      case "textarea": {
        const [textValue, setTextValue] = useState("");
        const maxLength = 200;

        const handleTextChange = (e) => {
          const value = e.target.value;
          if (value.length <= maxLength) {
            fieldRef.onChange(value);
            setTextValue(value);
          }
        };

        return (
          <>
            <textarea
              className={classes}
              rows="3"
              placeholder={placeholder}
              {...fieldRef}
              maxLength={maxLength}
              onChange={handleTextChange}
            />
            <div
              className={`text-sm text-gray-500 text-right ${textValue.length === maxLength ? "text-red-500" : ""}`}
            >
              {textValue.length} / {maxLength} 文字
            </div>
          </>
        );
      }
      case "select":
        return (
          <select className={classes} {...fieldRef}>
            <option value="" disabled>
              {placeholder}
            </option>
            {options &&
              options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.value}
                </option>
              ))}
          </select>
        );
      case "starRating": {
        const [rating, setRating] = useState(null);
        const [hover, setHover] = useState(null);

        return (
          <div className="flex">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={ratingValue}>
                  <input
                    type="radio"
                    value={ratingValue}
                    className="hidden"
                    onClick={() => {
                      fieldRef.onChange(ratingValue);
                      setRating(ratingValue.toString());
                    }}
                  />
                  <FaStar
                    size={50}
                    color={
                      ratingValue <= (hover || rating) ? "#ffd770" : "#e4e5e9"
                    }
                    className="cursor-pointer transition-colors duration-200"
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
        );
      }
      default:
        return (
          <input
            className={classes}
            type={type}
            placeholder={placeholder}
            {...fieldRef}
          />
        );
    }
  };

  return (
    <div className="form-group mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {renderInputField()}
      {hasError && (
        <p className="text-red-700 text-xs font-medium italic">{`${label}が必要です`}</p>
      )}
    </div>
  );
};

FormElement.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  fieldRef: PropTypes.object.isRequired,
  options: PropTypes.array,
  hasError: PropTypes.bool.isRequired,
};

export default FormElement;
