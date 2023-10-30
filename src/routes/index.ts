import { Router } from "express";
import fileRouter from "./file.routes";

type Route = {
    path: string;
    router: Router;
}

const routes: Route[] = [
    {path: '/file', router: fileRouter}
]

const router = Router();

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;