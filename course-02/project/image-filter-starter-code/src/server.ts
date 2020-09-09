import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, deleteLocalFile} from './util/util';
import fs from 'fs';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // file array for holding local files
  var imageFileArray = [""];
  var filteredImageFile = ""

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    console.log('hello from c2-image-filter root endpoint')
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get("/filteredimage", async(req, res) => {
    console.log('hello from c2-image-filter/filteredimage endpoint');
    console.log(`req params: ${req.query.image_url}`);

    let inputFile = req.query.image_url;

    // validate the url
    // return 422 on errors

    // call filter function
    console.log('calling filterImageFromURL()');
    try{
      filteredImageFile = await filterImageFromURL(inputFile);
    } catch (err) {
      alert(err);
      console.log('incorrect file type received ');
      res.status(422);
      res.send('incorrect file sent')
    }

      
      imageFileArray.push(filteredImageFile);   // save filename into array for later deletion
      console.log('returned from filterImageFromURL() function');

      // send file back to client in resp.send()
      res.status(200);
      //res.send(`returning file ${filteredImageFile}`);
      //res.send('hello from c2-image-filter/filteredimage endpoint');
      res.sendFile(filteredImageFile);

   
      res.on('finish', () => {
        console.log('delete file from server.ts ', filteredImageFile);
        //deleteLocalFiles(imageFileArray);
        deleteLocalFile(filteredImageFile);
        console.log('file deletion complete');

      })
   
      
    
    
    //
    


  })
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();