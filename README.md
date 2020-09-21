Project: basic restapi server
Description: demonstrates basic server functionality with a number of features described below.
Host URL:  http://udacity-c2-restapi-dev22222222.us-east-2.elasticbeanstalk.com/
Filtered image test query parameters:      image_url: https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg 

Request and expected responses:
enpoint:
/api/v0/feed/

* filtered image service, requests are redirected to image filter service. 
/api/v0/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg 



