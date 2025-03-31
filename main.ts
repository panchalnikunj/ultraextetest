// Ultrasonic sensor extension for micro:bit

namespace Ultrasonic {
    /**
     * Get the distance in centimeters from the ultrasonic sensor.
     */
    //% block="read distance"
    export function readDistance(): number {
        let trigPin: DigitalPin = DigitalPin.P1;
        let echoPin: DigitalPin.P0;

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
     */
    //% block="if obstacle is there"
    export function isObstacle(): boolean {
        return readDistance() < 30;
    }
}
