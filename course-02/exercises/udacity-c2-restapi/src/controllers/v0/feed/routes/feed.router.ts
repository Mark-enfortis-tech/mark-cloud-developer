import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: Router = Router();
const imageFilterAddress = 'http://localhost:8082'
const tempImageAddr = 'http://localhost:8082/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg'


// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    console.log('route /api/v0/feed')
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items);
});

// add redirection for image handling
router.get('/filteredimage', async( req: Request, res: Response) => {
    const imageAddrWithQparams = imageFilterAddress + req.url;
    //console.log('req.url is :',req.url);
    console.log('hardcoded url:', imageAddrWithQparams);
    //console.log('hardcoded url:', tempImageAddr);
    res.redirect(imageAddrWithQparams); 
    //res.redirect(tempImageAddr);
    //res.status(202);  
});

///////////    @TODO    ////////////
//Add an endpoint to GET a specific resource by Primary Key (id)
router.get('/:id', async( req: Request, res: Response) => {
    const searchId = parseInt(req.params.id);
    console.log(`client is requesting ID %d`, searchId);
    const item = await (FeedItem.findByPk(searchId));
    if(item == null){
        console.log(`Item %d not found `, searchId);
        res.status(401).send(`Item was not located`);
    } else {
        console.log(item);
        res.status(201).send(item);
    } 
});



// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        res.send(500).send("not implemented");
    console.log('router get - aws.getPutSignedUrl');
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', 
    requireAuth, 
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;

    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

    const item = await new FeedItem({
            caption: caption,
            url: fileName
    });

    const saved_item = await item.save();

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});



function sendRedirect(address: string, req: Request, res: Response){
    return new Promise(function(resolve, reject){
        res.redirect(address);


    })
}










export const FeedRouter: Router = router;
