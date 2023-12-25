---
sidebar_position: 1

---

# Install CKAN with Docker

In this section we will learn how to install CKAN with Docker.


### What you'll need

 - [CKAN Docker](https://github.com/ckan/ckan-docker.git) clone master branch.



-------------------------------------------------
Install CKAN with Docker
-------------------------------------------------


step 1: Clone the CKAN Docker repository

```bash
git clone https://github.com/ckan/ckan-docker.git
```

step 2: Change directory to the CKAN Docker repository

```bash
cd ckan-docker
```

step 3: Create a `.env` file

```bash
cp .env.template .env
```

step 4: Edit the `.env` file

```bash
vim .env
```

step 5: modify the `.env` file according to your needs like:

```ini
# CKAN core
CKAN_VERSION=2.10.0
CKAN_SITE_ID=default
CKAN_SITE_URL=https://localhost:8443
CKAN___BEAKER__SESSION__SECRET=CHANGE_ME
CKAN___API_TOKEN__JWT__ENCODE__SECRET=string:CHANGE_ME
CKAN___API_TOKEN__JWT__DECODE__SECRET=string:CHANGE_ME
CKAN_SYSADMIN_NAME=ckan_admin
CKAN_SYSADMIN_PASSWORD=test1234
CKAN_SYSADMIN_EMAIL=your_email@example.com

```
step 6: Modify the `Dockerfile` in ckan folder

```dockerfile

FROM ckan/ckan-base:2.10.3

# Install any extensions needed by your CKAN instance
# See Dockerfile.dev for more details and examples

# Copy custom initialization scripts
COPY docker-entrypoint.d/* /docker-entrypoint.d/

# Apply any patches needed to CKAN core or any of the built extensions (not the
# runtime mounted ones)
COPY patches ${APP_DIR}/patches

RUN for d in $APP_DIR/patches/*; do \
        if [ -d $d ]; then \
            for f in `ls $d/*.patch | sort -g`; do \
                cd $SRC_DIR/`basename "$d"` && echo "$0: Applying patch $f to $SRC_DIR/`basename $d`"; patch -p1 < "$f" ; \
            done ; \
        fi ; \
    done

```
- here you can change the `CKAN_VERSION` according to your needs.
- you can also add any extensions needed by your CKAN instance.
- you can also add any patches needed to CKAN core or any of the built extensions (not the runtime mounted ones).

step 7: Build the CKAN image

```bash
docker-compose build
```

step 8: Run the CKAN image

```bash
docker-compose up -d
```


