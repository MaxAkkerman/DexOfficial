import { Steps } from 'intro.js-react';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

import { steps } from '@/constants/defaultData';

export default function TutorialSteps() {
  const visible = useSelector((state) => state.chromePopup.visible);

  const { enabled, handleNextStep, handleOnExit, initialStep } = useTutorial();

  if (visible) return null;

  return (
    <Steps
      enabled={enabled}
      steps={steps}
      initialStep={initialStep}
      onChange={handleNextStep}
      onExit={handleOnExit}
    />
  );
}

function useTutorial() {
  const history = useHistory();

  const [client] = useLocalStorage('clientData', {});
  const [esp] = useLocalStorage('esp', '');
  const [tutored, setTutored] = useLocalStorage(
    'tutorialFinished',
    isEmpty(client) && isEmpty(esp) ? false : true,
  );

  const [enabled, setEnabled] = useState(!tutored);
  const [initialStep, setInitialStep] = useState(0);

  function handleNextStep(nextIdx) {
    if (nextIdx === 7) {
      setEnabled(false);
      history.push('/account');
      setInitialStep(7);
      setEnabled(true);
    }
  }

  function handleOnExit() {
    setEnabled(false);
    setTutored(true);
  }

  return {
    enabled,
    handleNextStep,
    handleOnExit,
    initialStep,
  };
}
