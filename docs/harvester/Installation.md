---
sidebar_position: 1
---

# install harvester and configure on CKAN

You have just learned the **How to install and configure AZURE AD on CKAN** 

### in this section we will learn how to install and configure harvester on CKAN

### What you'll need
 - [CKAN](https://docs.ckan.org/en/2.9/maintaining/installing/index.html) version 2.9 or above:
 - [ckanext-harvest](https://github.com/ckan/ckanext-harvest.git) compatible with CKAN 2.9.6 and above.


------------
Installation with Docker
------------

To install ckanext-harvest copy paste below code in your docker file.
``` 
### harvester ###
RUN pip3 install -e 'git+https://github.com/ckan/ckanext-harvest.git@master#egg=ckanext-harvest' && \
    pip3 install -r ${APP_DIR}/src/ckanext-harvest/pip-requirements.txt && \
    pip3 install -r ${APP_DIR}/src/ckanext-harvest/dev-requirements.txt 


# # Install Supervisor
RUN apk update && apk add --no-cache python3-dev py3-setuptools supervisor dcron busybox-extras
RUN pip install --upgrade supervisor schedule future

# # Copy Supervisor configuration
COPY harvesting.conf /etc/supervisord.d/harvesting.conf



COPY harvester.py /srv/app


```

your `harvesting.conf` file should look like this

```

[program:ckan_gather_consumer]
command=ckan harvester gather-consumer
user=root
numprocs=1
stdout_logfile=/var/log/gather_consumer.log
stderr_logfile=/var/log/gather_consumer.err.log
autostart=true
autorestart=true
startsecs=10

[program:ckan_fetch_consumer]
command=ckan harvester fetch-consumer
user=root
numprocs=1
stdout_logfile=/var/log/fetch_consumer.log
stderr_logfile=/var/log/fetch_consumer.err.log
autostart=true
autorestart=true
startsecs=10


```
your `harvester.py` file should look like this

```
import schedule
import time
import subprocess


def run_harvester():
    # Redirect logs to a file
    with open("harvester.log", "a") as log_file:
        # Execute the command "ckan harvester run" and redirect stdout and stderr to the log file
        subprocess.run(["ckan", "harvester", "run"], stdout=log_file, stderr=log_file)


# Schedule the job to run every 5 minutes
schedule.every(5).minutes.do(run_harvester)

# Run the scheduler continuously
while True:
    schedule.run_pending()
    time.sleep(1)


```

in your `.env` file add below lines

```
CKAN__PLUGINS = harvest ckan_harvester

CKAN__HARVEST__MQ__TYPE=redis
CKAN__HARVEST__MQ__HOSTNAME=redis
CKAN__HARVEST__MQ__PORT=6379
CKAN__HARVEST__MQ__REDIS_DB=0

```

some of the important commands to run harvester

```
python3 harvester.py &
```
###  harvester official documentation
refer this link https://github.com/ckan/ckanext-harvest#command-line-interface

### some above commads meaning:

- geather consumer: This command will gather all the harvest sources and create jobs for each of them. It will also create jobs for the harvest sources that are scheduled to run periodically.
- fetch consumer: This command will fetch the harvest objects for each of the jobs created by the gather consumer. It will also create jobs for the harvest objects that are scheduled to run periodically.
- Supervisor in Harvester: in Harvester supervisor is used to run the harvester in background. Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems. It shares some of the same goals of programs like launchd, daemontools, and runit. Unlike some of these programs, it is not meant to be run as a substitute for init as “process id 1”. Instead it is meant to be used to control processes related to a project or a customer, and is meant to start like any other program at boot time.


### creating harvest source using ckan UI

- go to your ckan and login as admin then to `/harvest` page and click on `Add Harvest Source` button
- fill the form and click on `save` button

Here is an example of a configuration object (the one that must be entered in the configuration field):


```
{
 "api_version": 1,
 "default_tags": [{"name": "geo"}, {"name": "namibia"}],
 "default_groups": ["science", "spend-data"],
 "default_extras": {"encoding":"utf8", "harvest_url": "{harvest_source_url}/dataset/{dataset_id}"},
 "override_extras": true,
 "organizations_filter_include": [],
 "organizations_filter_exclude": ["remote-organization"],
 "user":"harverster-user",
 "api_key":"<REMOTE_API_KEY>",
 "read_only": true,
 "remote_groups": "only_local",
 "remote_orgs": "create"
}
```
read more [here](https://github.com/ckan/ckanext-harvest?tab=readme-ov-file#the-ckan-harvester)


