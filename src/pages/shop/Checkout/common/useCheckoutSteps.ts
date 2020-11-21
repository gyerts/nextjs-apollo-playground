import {useCallback, useEffect, useRef, useState} from "react";

export const useCheckoutSteps = (maxSteps: number) => {
  const [currentStep, setStep] = useState(1);
  const [editStep, setEditStep] = useState(0);

  const currentStepRef = useRef(currentStep);
  const editStepRef = useRef(editStep);

  useEffect(function () {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(function () {
    editStepRef.current = editStep;
  }, [editStep]);

  const prevStep = useCallback(function () {
    setStep(s => s > 1 ? s - 1 : 1);
  }, []);

  const nextStep = useCallback(function (additional: number = 0) {
    const currentStep = currentStepRef.current;
    const editStep = editStepRef.current;

    if (currentStep !== editStep && editStep !== 0) {
      setEditStep(0);
    } else {
      setStep(s => s < maxSteps ? s + 1 + additional : s);
    }
  }, []);

  const isEditMode = currentStep !== editStep && editStep !== 0;

  return {
    nextStep,
    prevStep,
    step: isEditMode ? editStep : currentStep,
    setStep,
    editStep,
    setEditStep,
  };
};
