// Ultrasonic sensor extension for micro:bit

namespace Ultrasonic {
    /**
     * Get the distance in centimeters from the ultrasonic sensor.
     * @param trigPin the pin connected to the trigger
     * @param echoPin the pin connected to the echo
     */
    //% block="read distance trig %trigPin echo %echoPin"
    //% trigPin.fieldEditor="gridpicker" trigPin.fieldOptions.columns=4
    //% echoPin.fieldEditor="gridpicker" echoPin.fieldOptions.columns=4
    export function readDistance(trigPin: DigitalPin, echoPin: DigitalPin): number {
        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trigPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trigPin, 0);

        let duration = pins.pulseIn(echoPin, PulseValue.High, 23200);
        let distance = duration / 58;

        return distance;
    }
}
