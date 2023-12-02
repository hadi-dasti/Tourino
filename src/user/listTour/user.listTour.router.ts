import { Router } from 'express';
import {ListTours} from './user.listTour.controller'


const listTours = new ListTours();



const router: Router = Router()

router.get('/show-list-tour', listTours.getListTour.bind(ListTours));




export default router;