import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

export default class CategoryRoutes {
    private categoryController: CategoryController;

    constructor(private router: Router) {
        this.categoryController = new CategoryController();
        this.configureRoutes();
    }

    private configureRoutes() {
        // GET api/categories
        this.router.get(
            `/categories`,
            this.categoryController.getCategories
        );

        // POST api/categories
        this.router.post(
            `/categories`,
            this.categoryController.createCategory
        );
    }
}
