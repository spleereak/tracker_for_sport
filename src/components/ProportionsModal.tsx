import { X, Minus, Plus } from "lucide-react";
import React from "react";
import {UserData} from "../types/types.ts";

export const ProportionsModal: React.FC<{
  icon: any;
  weight?: number;
  height?: number;
  onClose: () => void;
  onSave: (data: UserData) => void;
  userData: UserData;
}> = ({ icon: Icon, weight, height, onClose, onSave, userData }) => {
  const isWeight = weight !== undefined;
  const initialValue = isWeight ? weight : height || 0;
  const [value, setValue] = React.useState(initialValue);

  // Set step and units based on whether we're editing weight or height
  const step = isWeight ? 0.1 : 1;
  const units = isWeight ? "кг" : "см";
  const minValue = isWeight ? 10 : 50;
  const maxValue = isWeight ? 300 : 250;

  // Format the value for display
  const displayValue = isWeight ? value.toFixed(1) : Math.floor(value);

  // Handle increment and decrement
  const increment = () => {
    if (value < maxValue) {
      setValue(prev => parseFloat((prev + step).toFixed(1)));
    }
  };

  const decrement = () => {
    if (value > minValue) {
      setValue(prev => parseFloat((prev - step).toFixed(1)));
    }
  };

  // Handle direct input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
      setValue(newValue);
    }
  };

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  };

  // Handle save
  const handleSave = () => {
    const userDataFromLS = localStorage.getItem('userData');
    let storedUserData = JSON.parse(userDataFromLS!);
    if (isWeight) {
      storedUserData.weight = value;
    } else {
      storedUserData.height = value;
    }
    localStorage.setItem('userData', JSON.stringify(userData));
    const updatedUserData = {
      ...userData,
      weight: isWeight ? value : userData.weight,
      height: !isWeight ? value : userData.height
    }
    onSave(updatedUserData);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden relative">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className="w-8 h-8 text-white mr-3" />
            <h2 className="text-2xl font-bold text-white">{isWeight ? 'Вес' : 'Рост'}</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Изменить {isWeight ? 'вес' : 'рост'}</span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center gap-4 w-full mb-6">
              <button
                onClick={decrement}
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Minus size={24} />
              </button>

              <div className="relative flex items-center">
                <input
                  type="text"
                  value={displayValue}
                  onChange={handleInputChange}
                  className="text-4xl font-bold text-center w-32 bg-transparent focus:outline-none"
                />
                <span className="text-xl text-gray-500 absolute right-0">{units}</span>
              </div>

              <button
                onClick={increment}
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="w-full px-4">
              <input
                type="range"
                min={minValue}
                max={maxValue}
                step={step}
                value={value}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{minValue} {units}</span>
                <span>{maxValue} {units}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};