/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import {RoleService} from "../service/RoleService";

const getRole = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Test")
    await RoleService.getRole(Number(req.params.id))
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
};


export default { getRole };