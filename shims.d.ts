// Auto-generated. Do not edit.
declare namespace mlrunner {

    /**
     * Register a TypeScript function to run when an event is raised.
     *
     * This custom version of the MakeCode onEvent function is needed due to:
     * https://github.com/microsoft/pxt-microbit/issues/5709
     * 
     *
     * @param src The ID of the component to listen to.
     * @param value The event value to listen to from that component.
     * @param handler The function to call when the event is detected.
     * @param flags The specified event flags are ignored and configured via pxt.json.
     */
    //% flags.defl=0 shim=mlrunner::customOnEvent
    function customOnEvent(src: int32, value: int32, handler: () => void, flags?: int32): void;
}

// Auto-generated. Do not edit. Really.
