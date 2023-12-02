import { Router } from 'express';
import { PackageController } from './user.pakage.controller';


const packageController = new PackageController();

const router: Router = Router();


router.get('/show-package', packageController.getPackageUser);

router.post('/build-package',packageController.buildPackageUser)

router.get('/get-one-package/:packageId', packageController.getOnePackageUser);

router.put('/update-one-package/:packageId', packageController.updatePackageUser);

router.delete('/delete-one-package/:packageId', packageController.deletePackageUser);


export default router