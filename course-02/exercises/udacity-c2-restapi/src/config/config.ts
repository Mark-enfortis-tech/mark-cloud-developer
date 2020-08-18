export const config = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres",
    "aws_region": "us-east-2",
    "aws_profile": "default",
    "aws_media_bucket": "udacity-saunders-dev1"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt" : {
    "secret": "helloworld"
  }
}

/*
"dev": {
    "username": "udagramsaunders",
    "password": "udagramsaunders",
    "database": "udagramsaunders",
    "host": "udagramsaunders.cmcgqbaqucgw.us-east-2.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-2",
    "aws_profile": "default",
    "aws_media_bucket": "udacity-saunders-dev1"
  },
*/