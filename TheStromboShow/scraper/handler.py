
import sys, os

here = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(here, "./vendored"))

import json
import logging

import re
import requests
from bs4 import BeautifulSoup
import boto3

log = logging.getLogger()
log.setLevel(logging.DEBUG)

def handler(event, context):
    log.debug("Received event {}".format(json.dumps(event)))

    url = "http://strombo.com/radio/"
    bucket = "stromboshow"
    
    s3_client = boto3.client('s3')
    
    discovered_shows = []
    s3_objects = s3_client.list_objects(Bucket=bucket)
    if 'Contents' in s3_objects:
        for obj in s3_objects['Contents']:
            discovered_shows.append(obj['Key'])
        log.debug("Shows in S3: " + str(discovered_shows))
    else:
        log.debug("No shows in S3.")
    
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    shows = soup.find_all('source', src = re.compile('\.mp3$'))
    if shows:
        latest_show_url = shows[0].get('src')
        show_name = str(latest_show_url).rsplit('/',1)[1]
        log.debug("Latest show: " + show_name)
        if show_name not in discovered_shows:
            r = requests.get(latest_show_url)
            with open("/tmp/latestshow.mp3", "wb") as f:
                f.write(r.content)
            log.debug("Download complete!")
            s3_client.upload_file('/tmp/latestshow.mp3', bucket, "latestshow.mp3")
            log.debug("Upload complete!")
            with open("/tmp/" + show_name, "w") as empty_file:
                pass
            log.debug("Created empty file as marker.")
            s3_client.upload_file("/tmp/" + show_name, bucket, show_name)
            log.debug("Uploaded new file marker.")
        else:
            log.error("Newest show already uploaded to S3, exiting.")
    else:
        log.error("No shows scraped, exiting.")
    return {}
