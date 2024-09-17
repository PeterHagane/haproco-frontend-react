import { useState, useEffect } from 'react';

const ModalTabManager = ({ containerRef, children }:{containerRef: any, children: any}) => {
    const [configuredTabIndexes, setConfiguredTabIndexes] = useState(false);

    const focusableElements = () => {
        return [...containerRef?.current?.querySelectorAll(
            'a, button, input, textarea, select, details, div, [tabindex]:not([tabindex="-1"]):not([type="hidden"]):not([disabled])'
        )];
    }

    const isTabbable = (element: { getAttribute: (arg0: string) => any; }) =>{
        if(element.getAttribute('tabindex')){
            return true;
        }
        return false;
    }

    const findElementByTabIndex = (tabIndex: any) => {
        return containerRef?.current?.querySelector(`[tabindex="${tabIndex}"]`);
    }
    
    const moveFocusToTabIndex = (tabIndex: number) => {
        findElementByTabIndex(tabIndex)?.focus();
    }

    const handleFocusEvent = (event: { target: { getAttribute: any; }; shiftKey: any; key: string; }) => {
        if(!isTabbable(event.target)){
            return;
        }

        const tabIndex = parseInt(event.target.getAttribute('tabindex'));

        if(event.shiftKey && event.key === 'Tab'){
            moveFocusToTabIndex(tabIndex - 1);
        }else if(event.key === 'Tab'){ //should probably make sure there is no other modifier key pressed.
            moveFocusToTabIndex(tabIndex + 1);
        }
    }

    useEffect(() => {
        if(!configuredTabIndexes && containerRef.current){
            setConfiguredTabIndexes(true);
            focusableElements().forEach((el, index) => el.setAttribute('tabindex', index + 1));
            containerRef?.current?.addEventListener('keydown', (event: any) => {
                handleFocusEvent(event);
            });
        }
    });

    return children;
}

export default ModalTabManager;