/*
Copyright 2016 Google, Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Example : https://houdini.glitch.me/paint
if (typeof registerPaint !== "undefined") {
    registerPaint(
        "ripple",
        class {
            static get inputProperties() {
                return [
                    "--animation-tick",
                    "--ripple-color",
                    "--ripple-speed",
                    "--ripple-x",
                    "--ripple-y",
                    "--ripple-stroke-color",
                    "--ripple-stroke-width",
                ];
            }
            paint(ctx, geom, properties) {
                const defaultSpeed = 1000;
                const speed = parseInt(
                    properties.get("--ripple-speed")?.toString() || defaultSpeed
                );

                const rippleColor = properties.get("--ripple-color").toString();
                const x = parseFloat(properties.get("--ripple-x").toString());
                const y = parseFloat(properties.get("--ripple-y").toString());

                const rippleStrokeColor = properties.get("--ripple-stroke-color").toString();
                const rippleStrokeWidth = properties.get("--ripple-stroke-width").toString();

                let tick = parseFloat(
                    properties.get("--animation-tick").toString()
                );
                if (tick < 0) {
                    tick = 0;
                } else if (tick > speed) {
                    tick = speed;
                }

                ctx.fillStyle = rippleColor;
                let t = tick / speed;

                ctx.globalAlpha = 1 - (t * t);
                ctx.beginPath();
                ctx.arc(
                    x,
                    y,
                    (geom.width * tick) / speed, // radius
                    0, // startAngle
                    2 * Math.PI // endAngle
                );

                ctx.fill();

                ctx.strokeStyle = rippleStrokeColor;
                ctx.lineWidth = rippleStrokeWidth;
                ctx.stroke();
            }
        }
    );
}
