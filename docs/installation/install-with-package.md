---
sidebarposition: 2

---

# Install CKAN with Package

In this section we will learn how to install CKAN with Package.

### What you'll need

 - [ubunutu](https://ubuntu.com/download/server) version 20.4
 - [CKAN DOCS](https://docs.ckan.org/en/latest/maintaining/installing/index.html#package-install) official docs.



### CKAN Installation Guide on Ubuntu 20.04

Follow these steps to install CKAN on Ubuntu 20.04:

1. Login in as root user. If this is your first time, you will need to create a root password:
    ```bash
    sudo passwd root
    ```
2. Login as root user, enter password when prompted:
    ```bash
    sudo -i
    ```
3. Update ubuntu package index:
    ```bash
    sudo apt update
    ```
4. Install Ubuntu required packages for CKAN:
    ```bash
    sudo apt install -y libpq5 redis-server nginx supervisor
    ```
5. Download CKAN package. In this guide we are installing CKAN for Python 3:
    ```bash
    wget https://packaging.ckan.org/python-ckan_2.9-py3-focal_amd64.deb
    ```
6. Install additional needed packages:
    ```bash
    python3 --version
    sudo apt-get install python3.8-distutils
    ```
7. Install CKAN package:
    ```bash
    sudo dpkg -i python-ckan_2.9-py3-focal_amd64.deb
    ```
8. Install PostgreSQL:
    ```bash
    sudo apt install -y postgresql
    ```
9. Check that it installed correctly by running the following command and ensuring that the encoding of databases is UTF8:
    ```bash
    sudo -u postgres psql -l
    ```
<!-- ![postgresql](/static/img/postsql-l.png) -->



10. Create a database user and create a password for the new user when prompted, replace `username` with the username of your choice:
    ```bash
    sudo -u postgres createuser -S -D -R -P username
    ```
11. Create a new PostgreSQL database owned by the new user, replace `ckan_default` with a database name of your choice and `username` with the username of the user just created:
    ```bash
    sudo -u postgres createdb -O username ckan_default -E utf-8
    ```
12. If you do not have vim installed you will need to install it with the following:
    ```bash
    apt install vim
    ```
13. Edit the CKAN configuration file and fill in the password, database, and database user for the database you’ve created:
    ```bash
    vim /etc/ckan/default/ckan.ini
    ```
    In this example our information is as follows:
    - Username: `ckanuser`
    - Password: `password`
    - Database Name: `ckan_default`

14. Install Solr:
    ```bash
    sudo apt install -y solr-tomcat
    ```
15. Change the default port Tomcat runs on to the one expected by CKAN:
    ```bash
    vim /etc/tomcat9/server.xml
    ```
    Edit the following line:
    ```xml
    <Connector port="8080" protocol="HTTP/1.1"
    ```
    To:
    ```xml
    <Connector port="8983" protocol="HTTP/1.1"
    ```



16. Replace the default `schema.xml` file with a symlink to the CKAN schema file:
    ```bash
    sudo mv /etc/solr/conf/schema.xml /etc/solr/conf/schema.xml.bak
    sudo ln -s /usr/lib/ckan/default/src/ckan/ckan/config/solr/schema.xml /etc/solr/conf/schema.xml
    ```
17. Restart Solr:
    ```bash
    sudo service tomcat9 restart
    ```
18. Check that Solr is running by entering the following into your browser:
    ```
    http://localhost:8983/solr/
    ```
19. Edit the `solr_url` line in the CKAN configuration file to go to your Solr server:
    ```bash
    vim /etc/ckan/default/ckan.ini
    ```
    Example:
    ```
    solr_url = http://127.0.0.1:8983/solr
    ```
20. Also edit the following options in the CKAN configuration File:
    - `site_id=ckan_default`
    - `site_url=http://localhost`

21. Initialize CKAN database by running the following command:
    ```bash
    sudo ckan db init
    ```
22. Reload the Supervisor daemon so the new processes are picked up:
    ```bash
    sudo supervisorctl reload
    ```
23. Check the status of the processes:
    ```bash
    sudo supervisorctl status
    ```
    The following should appear with no errors:
    ```
    ckan-datapusher:ckan-datapusher-00   RUNNING   pid 1963, uptime 0:00:12
    ckan-uwsgi:ckan-uwsgi-00             RUNNING   pid 1964, uptime 0:00:12
    ckan-worker:ckan-worker-00           RUNNING   pid 1965, uptime 0:00:12
    ```
24. Restart Nginx:
    ```bash
    sudo service nginx restart
    ```
25. Enter the following into your web browser and the CKAN front page should appear:
    ```
    http://localhost/
    ```

### Congratulations! You have successfully installed CKAN!👌

---------------------------------
### Additional CKAN Setup Steps

Follow these steps to create a super user, setup file uploads, activate the CKAN virtual environment, and update the dataproxy timeout:

1. To create a super user in CKAN, run the following command, replacing `username`, `email@gmail.com`, and `name` with your desired values:
    ```bash
    ckan -c /etc/ckan/default/ckan.ini sysadmin add username email=email@gmail.com name=name
    ```
    Example:
    ```bash
    ckan -c /etc/ckan/default/ckan.ini sysadmin add vivek email=vivek2292@gmail.com name=vivek
    ```

2. To setup CKAN’s FileStore with local file storage:
    - Create the directory where CKAN will store uploaded files:
        ```bash
        sudo mkdir -p /var/lib/ckan/default
        ```
    - Add the following line to your CKAN config file, after the `[app:main]` line:
        ```
        ckan.storage_path = /var/lib/ckan/default
        ```
    - Set the permissions of your `ckan.storage_path` directory. For example if you’re running CKAN with Nginx, then the Nginx’s user (`www-data` on Ubuntu) must have read, write and execute permissions for the `ckan.storage_path`:
        ```bash
        sudo chown www-data /var/lib/ckan/default
        sudo chmod u+rwx /var/lib/ckan/default
        ```
    - Restart your web server, for example to restart uWSGI on a package install:
        ```bash
        sudo supervisorctl restart ckan-uwsgi:*
        ```

3. To activate the CKAN virtual environment:
    ```bash
    . /usr/lib/ckan/default/bin/activate
    ```

4. To update the dataproxy timeout:
    - Open the `recline_view.js` file:
        ```bash
        vim /usr/lib/ckan/default/src/ckan/ckanext/reclineview/theme/public/recline_view.js
        ```
    - Update the following line:
        ```javascript
        recline.Backend.DataProxy.timeout = 100000;
        ```




### Note: You can also refer old docs for installation of CKAN with Package [here](https://docs.google.com/document/d/1cSkR2OCX70mh3GPKUs8st07mKQiFZJFay55MVyNy0DA/edit?usp=sharing)
