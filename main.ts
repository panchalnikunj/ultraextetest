// Ultrasonic sensor extension for micro:bit

namespace Ultrasonic {
    export enum PinSet {
        //% block="P0-1"
        P0_1,
        //% block="P3-4"
        P3_4
    }

    /**
     * Get the distance in centimeters from the ultrasonic sensor.
     * @param pinSet select P0-1 or P3-4 for sensor connection
     */
    //% block="read distance from %pinSet"
    export function readDistance(pinSet: PinSet): number {
        let trigPin: DigitalPin;
        let echoPin: DigitalPin;

        if (pinSet === PinSet.P0_1) {
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
    export function isObstacle(pinSet: PinSet): boolean {
        return readDistance(pinSet) < 30;
    }
}
