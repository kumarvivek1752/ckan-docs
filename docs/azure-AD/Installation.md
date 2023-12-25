---
sidebar_position: 1
---

# install Azure AD and configure on CKAN

You have just learned the **How to install CKAN** 

## in this section we will learn how to install Azure AD on CKAN

### What you'll need
 - [CKAN](https://docs.ckan.org/en/2.9/maintaining/installing/index.html) version 2.9 or above:
 - [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) version 2.0 or above:
 - [ckan-msal](https://github.com/ongov/ckanext-msal.git) compatible with CKAN 2.9.6 and CKAN 2.9.7

------------
Installation
------------

To install ckanext-msal:

1. Activate your CKAN virtual environment, for example::

    ```
     . /usr/lib/ckan/default/bin/activate
    ```

2. Install the ckanext-msal Python package into your virtual environment::

     ```
     git clone https://github.com/boykoc/ckanext-msal.git
     cd ckanext-msal/
     python setup.py develop
     pip install -r requirements.txt
     ```

3. Add ``msal`` to the ``ckan.plugins`` setting in your CKAN
   config file (by default the config file is located at
   ``/etc/ckan/default/production.ini``).

4. Edit `msal_config.py <https://github.com/ongov/ckanext-msal/blob/ckan_2.9.7_compatible/ckanext/msal/msal_config.py>`_ and replace the generic values with your specific credentials.

5.  Restart CKAN. For example if you've deployed CKAN on Ubuntu::

    ```
    sudo service supervisor restart
    ```



-------
if you are using docker
-------

copy paste below code in your docker file and add `msal` in .env file

```
### Msal ###
RUN  pip3 install -e git+https://github.com/ongov/ckanext-msal.git#egg=ckanext-msal

COPY msal_config.py ${APP_DIR}/src/ckanext-msal/ckanext/msal/msal_config.py

```

then
```
docker compose -f docker-compose.yml build --no-cache
docker compose -f docker-compose.yml up -d
```

### Configuration

your `msal_config.py` should look like this

```
# MSAL configurations.
AUTHORITY = "https://login.microsoftonline.com/d0139cb0-61c2-7362-9vf8c-e229cdf0fbed"
CLIENT_ID = "5b040eb5-a574-8464-c489bc25580d"
SCOPE = ["User.ReadBasic.All"]
REDIRECT_URI = "http://localhost:5000/getAToken"
CLIENT_SECRET = "P6D8Q~jhdsuhftIqZJs7N.k~EEOl~-axC"

# Plugin specific configurations.
EMAIL_DOMAINS = ["google.com","manishacharyagmail.onmicrosoft.com"]


```
- AUTHORITY: The authority URL for your tenant. For example: https://login.microsoftonline.com/your-tenant-name.onmicrosoft.com
- CLIENT_ID: The application ID of your app registered in Azure AD.
- SCOPE: The scopes required by your app. For example: ["User.ReadBasic.All"].
- REDIRECT_URI: The redirect URI of your app. For example: http://localhost:5000/getAToken.
- CLIENT_SECRET: The client secret of your app.
- EMAIL_DOMAINS: The list of email domains that are allowed to access CKAN. For example: ["google.com"].


