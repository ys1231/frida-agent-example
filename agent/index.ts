import Java from "frida-java-bridge";
import { log } from "./logger.js";

Interceptor.attach(Module.getGlobalExportByName("open"), {
    onEnter(args) {
        const path = args[0].readUtf8String();
        log.debug(`open( path="${path}" )`);
        log.info(`open( path="${path}" )`);
        log.warning(`open( path="${path}" )`);
        log.error(`open( path="${path}" )`);
    },onLeave(retval){
        log.error(`open( retval=${retval} )`);
    }
});

if (Java.available) {
    Java.perform(() => {
        log.debug(`Process id:${Process.id.toString()}`);
    });
} else {
    log.error("No Java VM in this process");
}