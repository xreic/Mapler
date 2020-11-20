// Core
import React, { useContext, useState } from 'react';
import Store from 'electron-store';

// Components
import { SettingsContext } from '../context/SettingsContext';
import { Button } from '../utils/Button';

// Helper
import { MdSettings } from 'react-icons/md';
import { REGION, REGIONS } from '../utils/variables';

const store = new Store();

export const Settings = () => {
  const { isSettingsOpen, setIsSettingsOpen } = useContext(SettingsContext);

  const handleClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="divide-y divide-black">
      <div className="flex">
        <Button action={handleClick}>
          <MdSettings className="m-auto" />
        </Button>
      </div>

      {isSettingsOpen && <Regions />}
    </div>
  );
};

const Regions = () => {
  const [currentRegion, setCurrentRegion] = useState(store.get(REGION));

  const handleClick = (index) => {
    setCurrentRegion(index);
    store.set(REGION, index);
  };

  return (
    <div className="flex justify-evenly bg-gray-400 divide-x divide-black">
      {REGIONS.map((region, index) => (
        <Button
          key={region}
          action={() => handleClick(index)}
          extraCSS={`${currentRegion === index && 'bg-orange-200'}`}
        >
          {region}
        </Button>
      ))}
    </div>
  );
};
