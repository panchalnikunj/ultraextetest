//% block="Ultrasonic Sensor"
namespace Ultrasonic {
    /**
     * Measure distance using an ultrasonic sensor.
     * @return Distance in centimeters
     */
    //% block="read distance in cm"
    export function readDistance(): number {
        let trigger = DigitalPin.P1;
        let echo = DigitalPin.P0;

        // Send a 10µs pulse to trigger pin
        pins.digitalWritePin(trigger, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trigger, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trigger, 0);

        // Measure the pulse duration on echo pin
        let duration = pins.pulseIn(echo, PulseValue.High, 25000); // Timeout at ~4m

        // Convert duration to distance (speed of sound = 343 m/s)
        let distance = duration * 0.034 / 2;

        return distance;
    }
}
