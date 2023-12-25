---
sidebar_position: 1
---

# How to Generate CKAN Plugin


in this section we will learn how to generate a CKAN plugin

### What you'll need
 - [CKAN](https://docs.ckan.org/en/2.9/maintaining/installing/index.html) version 2.9 or above:
 - [CKAN Docker](https://github.com/ckan/ckan-docker.git) install latest version.


-------------------------------------------------
Generate CKAN Extension if you are using CKAN Docker
-------------------------------------------------


You can use the ckan [extension](https://docs.ckan.org/en/latest/extensions/tutorial.html#creating-a-new-extension) instructions to create a CKAN extension, only executing the command inside the CKAN container and setting the mounted `src/` folder as output:
```bash
docker compose -f docker-compose.dev.yml exec ckan-dev /bin/sh -c "ckan generate extension --output-dir /srv/app/src_extensions"
```
![Screenshot 2023-02-22 at 1 45 55 pm](https://user-images.githubusercontent.com/54408245/220623568-b4e074c7-6d07-4d27-ae29-35ce70961463.png)


The new extension files and directories are created in the `/srv/app/src_extensions/` folder in the running container. They will also exist in the local src/ directory as local `/src` directory is mounted as `/srv/app/src_extensions/` on the ckan container. You might need to change the owner of its folder to have the appropiate permissions.


