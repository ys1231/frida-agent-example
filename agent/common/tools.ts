/*
 * Tools module
   通用工具
 */

import {log} from "../logger";

export const tools = {

    /**
     * 跟踪 android_dlopen_ext 调用
     */
    trace_android_dlopen_ext(cRetval: boolean = true) {
        log.debug("trace android_dlopen_ext");
        const android_dlopen_extPtr = Process.getModuleByName('libc.so').getExportByName('android_dlopen_ext')
        log.info("android_dlopen_ext address " + android_dlopen_extPtr)
        Interceptor.attach(android_dlopen_extPtr,
            {
                onEnter: function (args) {
                    const pathPtr = args[0];
                    if (pathPtr !== undefined && pathPtr != null) {
                        const path = pathPtr.readCString();
                        log.info("android_dlopen_ext load:" + path);
                    }
                }, onLeave: function (retval) {
                    if (cRetval) {
                        log.info("android_dlopen_ext retval:" + retval);
                    }
                }
            });
    },

    /**
     * 从 android_dlopen_ext dump so
     * @param soName 关注的 so 名称
     * @param isdump 是否 dump so
     * @param soSavePath so dump 保存路径 /data/data/cn.ishansong/
     */
    dump_android_dlopen_ext(soName: string | null = null, soSavePath: string | null = null) {

        const android_dlopen_extPtr = Process.getModuleByName('libc.so').getExportByName('android_dlopen_ext')
        log.info("android_dlopen_ext address " + android_dlopen_extPtr)
        Interceptor.attach(android_dlopen_extPtr,
            {
                onEnter: function (args) {
                    const pathptr = args[0];
                    if (pathptr !== undefined && pathptr != null) {
                        const path = pathptr.readCString();
                        if (soName != null && path != null && path.includes(soName)) {
                            log.info("load1 " + path);
                            this.isdump = true;
                        } else if (soName == null) {
                            log.info("load2 " + path);
                            this.isdump = false;
                        }
                    }
                }, onLeave: function (retval) {
                    // log.info("android_dlopen_ext retval " + retval);

                    if (this.isdump && soName != null && soSavePath != null) {
                        const libSo = Process.findModuleByName(soName);
                        if (libSo == null) {
                            log.error("so not found: " + soName);
                            return;
                        }
                        log.info("dump so: " + libSo.base + " - " + libSo.size);
                        const file = new File(soSavePath + soName, 'w');
                        Memory.protect(libSo.base, libSo.size, 'rw-');
                        let buffer = null;
                        try {
                            log.debug("Change " + libSo.base + " - " + libSo.size + " to rw-")
                            buffer = libSo.base.readByteArray(libSo.size);
                        } catch (e) {
                            log.error("Change " + libSo.base + " - " + libSo.size + " to rw- error: " + e)
                        }
                        if (buffer != null) {
                            log.debug("write " + buffer.byteLength + " bytes")
                            file.write(buffer)
                            file.close()
                            log.info("dump so success: " + soSavePath + soName);
                        } else {
                            log.error("dump so failed: " + soSavePath + soName);
                        }
                    } else {
                        // log.info("not dump so");
                    }
                }
            }
        );
    },

}