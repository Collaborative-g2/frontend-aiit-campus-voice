import PropTypes from "prop-types";
import {useState} from "react";

const FormElement = ({type, label, placeholder, options, fieldRef, hasError}) => {
    const classes = "form-control w-full px-3 py-1.5 text-gray-700 rounded border border-solid border-gray-300 focus:border focus:outline-secondary"

    const renderInputField = () => {
        switch (type) {
            case "input": {
                const [inputValue, setInputValue] = useState("");
                const [suggestions, setSuggestions] = useState([]);
                const [showSuggestions, setShowSuggestions] = useState(false);
                const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

                const handleInputChange = (e) => {
                    const value = e.target.value;
                    setInputValue(value);

                    if (value) {
                        const filtered = options.filter((option) =>
                            option.includes(value)
                        );
                        // The subject suggestion list is limited to 10 items.
                        setSuggestions(filtered.slice(0, 10));
                        setShowSuggestions(true);
                    } else {
                        setShowSuggestions(false);
                    }
                };

                const handleOptionClick = (option) => {
                    fieldRef.onChange(option)
                    setIsSuggestionSelected(true);
                    setInputValue(option);
                    setShowSuggestions(false);
                    setSuggestions([]);
                };

                const handleBlur = () => {
                    if (isSuggestionSelected) {
                        setIsSuggestionSelected(false)
                    } else {
                        setInputValue("");
                        setShowSuggestions(false);
                    }
                }

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
                                    suggestions.map((option, index) => (
                                        <li
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleOptionClick(option);
                                            }}
                                        >
                                            {option}
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
            case "textarea":
                return (
                    <textarea
                        className={classes}
                        rows="3"
                        placeholder={placeholder}
                        {...fieldRef}
                    />
                );
            case "select":
                return (
                    <select className={classes} {...fieldRef}>
                        <option value="" disabled>{placeholder}</option>
                        {options && options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                );
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
            {hasError && <p className="text-red-700 text-xs font-medium italic">{`${label}が必要です`}</p>}
        </div>
    );
};

FormElement.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    fieldRef: PropTypes.object.isRequired,
    options: PropTypes.array,
    hasError: PropTypes.bool.isRequired,
};

export default FormElement;