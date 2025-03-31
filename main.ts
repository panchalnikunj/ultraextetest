// Ultrasonic sensor extension for micro:bit

namespace Ultrasonic {
    /**
     * Get the distance in centimeters from the ultrasonic sensor.
     * @param pinSet select P0-1 or P3-4 for sensor connection
     */
    //% block="read distance from %pinSet"
    //% pinSet.shadow="dropdown" pinSet.defl="P0-1"
    //% pinSet.fieldEditor="gridpicker" pinSet.fieldOptions.columns=2
    export function readDistance(pinSet: string): number {
        let trigPin: DigitalPin;
        let echoPin: DigitalPin;

        if (pinSet === "P0-1") {
            trigPin = DigitalPin.P1;
            echoPin = DigitalPin.P0;
        } else {
            trigPin = DigitalPin.P4;
            echoPin = DigitalPin.P3;
        }

        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trigPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trigPin, 0);

        let duration = pins.pulseIn(echoPin, PulseValue.High, 23200);
        let distance = duration / 58;

        return distance;
    }

    /**
     * Check if an obstacle is detected within 30cm.
     * @param pinSet select P0-1 or P3-4 for sensor connection
     */
    //% block="if obstacle is there at %pinSet"
    //% pinSet.shadow="dropdown" pinSet.defl="P0-1"
    //% pinSet.fieldEditor="gridpicker" pinSet.fieldOptions.columns=2
    export function isObstacle(pinSet: string): boolean {
        return readDistance(pinSet) < 30;
    }
}
