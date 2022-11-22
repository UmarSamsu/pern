import { fileRoutes } from "./Routes/fileRoutes";
import { authRoutes } from "./Routes/authRoutes";
import { todoRoutes } from "./Routes/todoRoutes"
import { videoRoutes } from "./Routes/videoRoutes";
import { clusterRoutes } from "./Routes/clusterRoutes";

export const addAppRoutes = (app) => {

    app.use('/auth', authRoutes())
    app.use('/todos', todoRoutes())
    app.use('/file', fileRoutes())
    app.use('/video', videoRoutes())
    app.use('/cluster', clusterRoutes())

    return app
}