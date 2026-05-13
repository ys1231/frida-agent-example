/*
 * App module
    App 状态 Context
 */
export class App {
    private static instance: App;
    private constructor() {
    }
    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    /**
     * 获取当前进程 ID
     */
    getPid(): number {
        return Process.id;
    }



}

export const app = App.getInstance();