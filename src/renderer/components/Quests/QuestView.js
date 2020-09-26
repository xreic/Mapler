// Core
import React from 'react';

// Components
import { QuestSelector } from './QuestSelector';

// Component
export const QuestView = ({ children }) => (
  <>
    <QuestSelector />
    <div className="p-4">{children}</div>
  </>
);
