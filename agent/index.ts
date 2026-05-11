// import Java from "frida-java-bridge";
import { log } from "./logger.js";



// if (Java.available) {
//     Java.perform(() => {
//         log.debug(`Process id:${Process.id.toString()}`);
//     });
// } else {
//     log.error("No Java VM in this process");
// }

log.info("Hello Java VM in this process");