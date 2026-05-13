// import Java from "frida-java-bridge";
// import { log } from "./logger.js";
// import {hsbc} from "./apks/mx.hsbc.hsbcmexico.js";
import {izzi} from "./apks/telecom.televisa.com.izzi";



// if (Java.available) {
//     Java.perform(() => {
//         log.debug(`Process id:${Process.id.toString()}`);
//         hsbc.main();
//     });
// } else {
//     log.error("No Java VM in this process");
// }

// log.info("Hello Java VM in this process");
// hsbc.main();
izzi.main();