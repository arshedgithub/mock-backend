import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export default class UserRoutes {
    private userController: UserController;

    constructor(private router: Router) {
        this.userController = new UserController();
        this.configureRoutes();
    }

    private configureRoutes() {
        // GET api/users/uploadForm
        this.router.get(
            `/users/upload`,
            this.userController.getUploadForm
        );

        // GET api/users
        this.router.get(
            `/users`,
            this.userController.getAllUsers
        );

         // POST api/users
         this.router.post(
            `/users`,
            this.userController.createUser
        );

        // // GET api/users/me
        // this.router.get(
        //     `/users/upload`,
        //     this.userController.getCurrentUser
        // );

    }
} 