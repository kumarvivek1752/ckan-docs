"use strict";(self.webpackChunkckan_docs=self.webpackChunkckan_docs||[]).push([[949],{7377:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var t=n(5893),s=n(1151);const a={sidebar_position:1},o="install harvester and configure on CKAN",i={id:"harvester/Installation",title:"install harvester and configure on CKAN",description:"You have just learned the How to install and configure AZURE AD on CKAN",source:"@site/docs/harvester/Installation.md",sourceDirName:"harvester",slug:"/harvester/Installation",permalink:"/ckan-docs/harvester/Installation",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/harvester/Installation.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Harvester with CKAN",permalink:"/ckan-docs/category/harvester-with-ckan"},next:{title:"Schemming with CKAN",permalink:"/ckan-docs/category/schemming-with-ckan"}},c={},l=[{value:"in this section we will learn how to install and configure harvester on CKAN",id:"in-this-section-we-will-learn-how-to-install-and-configure-harvester-on-ckan",level:3},{value:"What you&#39;ll need",id:"what-youll-need",level:3},{value:"Installation with Docker",id:"installation-with-docker",level:2},{value:"harvester official documentation",id:"harvester-official-documentation",level:3},{value:"some above commads meaning:",id:"some-above-commads-meaning",level:3},{value:"creating harvest source using ckan UI",id:"creating-harvest-source-using-ckan-ui",level:3}];function h(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"install-harvester-and-configure-on-ckan",children:"install harvester and configure on CKAN"}),"\n",(0,t.jsxs)(r.p,{children:["You have just learned the ",(0,t.jsx)(r.strong,{children:"How to install and configure AZURE AD on CKAN"})]}),"\n",(0,t.jsx)(r.h3,{id:"in-this-section-we-will-learn-how-to-install-and-configure-harvester-on-ckan",children:"in this section we will learn how to install and configure harvester on CKAN"}),"\n",(0,t.jsx)(r.h3,{id:"what-youll-need",children:"What you'll need"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.a,{href:"https://docs.ckan.org/en/2.9/maintaining/installing/index.html",children:"CKAN"})," version 2.9 or above:"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.a,{href:"https://github.com/ckan/ckanext-harvest.git",children:"ckanext-harvest"})," compatible with CKAN 2.9.6 and above."]}),"\n"]}),"\n",(0,t.jsx)(r.hr,{}),"\n",(0,t.jsx)(r.h2,{id:"installation-with-docker",children:"Installation with Docker"}),"\n",(0,t.jsx)(r.p,{children:"To install ckanext-harvest copy paste below code in your docker file."}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"### harvester ###\r\nRUN pip3 install -e 'git+https://github.com/ckan/ckanext-harvest.git@master#egg=ckanext-harvest' && \\\r\n    pip3 install -r ${APP_DIR}/src/ckanext-harvest/pip-requirements.txt && \\\r\n    pip3 install -r ${APP_DIR}/src/ckanext-harvest/dev-requirements.txt \r\n\r\n\r\n# # Install Supervisor\r\nRUN apk update && apk add --no-cache python3-dev py3-setuptools supervisor dcron busybox-extras\r\nRUN pip install --upgrade supervisor schedule future\r\n\r\n# # Copy Supervisor configuration\r\nCOPY harvesting.conf /etc/supervisord.d/harvesting.conf\r\n\r\n\r\n\r\nCOPY harvester.py /srv/app\r\n\r\n\n"})}),"\n",(0,t.jsxs)(r.p,{children:["your ",(0,t.jsx)(r.code,{children:"harvesting.conf"})," file should look like this"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"\r\n[program:ckan_gather_consumer]\r\ncommand=ckan harvester gather-consumer\r\nuser=root\r\nnumprocs=1\r\nstdout_logfile=/var/log/gather_consumer.log\r\nstderr_logfile=/var/log/gather_consumer.err.log\r\nautostart=true\r\nautorestart=true\r\nstartsecs=10\r\n\r\n[program:ckan_fetch_consumer]\r\ncommand=ckan harvester fetch-consumer\r\nuser=root\r\nnumprocs=1\r\nstdout_logfile=/var/log/fetch_consumer.log\r\nstderr_logfile=/var/log/fetch_consumer.err.log\r\nautostart=true\r\nautorestart=true\r\nstartsecs=10\r\n\r\n\n"})}),"\n",(0,t.jsxs)(r.p,{children:["your ",(0,t.jsx)(r.code,{children:"harvester.py"})," file should look like this"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:'import schedule\r\nimport time\r\nimport subprocess\r\n\r\n\r\ndef run_harvester():\r\n    # Redirect logs to a file\r\n    with open("harvester.log", "a") as log_file:\r\n        # Execute the command "ckan harvester run" and redirect stdout and stderr to the log file\r\n        subprocess.run(["ckan", "harvester", "run"], stdout=log_file, stderr=log_file)\r\n\r\n\r\n# Schedule the job to run every 5 minutes\r\nschedule.every(5).minutes.do(run_harvester)\r\n\r\n# Run the scheduler continuously\r\nwhile True:\r\n    schedule.run_pending()\r\n    time.sleep(1)\r\n\r\n\n'})}),"\n",(0,t.jsxs)(r.p,{children:["in your ",(0,t.jsx)(r.code,{children:".env"})," file add below lines"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"CKAN__PLUGINS = harvest ckan_harvester\r\n\r\nCKAN__HARVEST__MQ__TYPE=redis\r\nCKAN__HARVEST__MQ__HOSTNAME=redis\r\nCKAN__HARVEST__MQ__PORT=6379\r\nCKAN__HARVEST__MQ__REDIS_DB=0\r\n\n"})}),"\n",(0,t.jsx)(r.p,{children:"some of the important commands to run harvester"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"python3 harvester.py &\n"})}),"\n",(0,t.jsx)(r.h3,{id:"harvester-official-documentation",children:"harvester official documentation"}),"\n",(0,t.jsxs)(r.p,{children:["refer this link ",(0,t.jsx)(r.a,{href:"https://github.com/ckan/ckanext-harvest#command-line-interface",children:"https://github.com/ckan/ckanext-harvest#command-line-interface"})]}),"\n",(0,t.jsx)(r.h3,{id:"some-above-commads-meaning",children:"some above commads meaning:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"geather consumer: This command will gather all the harvest sources and create jobs for each of them. It will also create jobs for the harvest sources that are scheduled to run periodically."}),"\n",(0,t.jsx)(r.li,{children:"fetch consumer: This command will fetch the harvest objects for each of the jobs created by the gather consumer. It will also create jobs for the harvest objects that are scheduled to run periodically."}),"\n",(0,t.jsx)(r.li,{children:"Supervisor in Harvester: in Harvester supervisor is used to run the harvester in background. Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems. It shares some of the same goals of programs like launchd, daemontools, and runit. Unlike some of these programs, it is not meant to be run as a substitute for init as \u201cprocess id 1\u201d. Instead it is meant to be used to control processes related to a project or a customer, and is meant to start like any other program at boot time."}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"creating-harvest-source-using-ckan-ui",children:"creating harvest source using ckan UI"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["go to your ckan and login as admin then to ",(0,t.jsx)(r.code,{children:"/harvest"})," page and click on ",(0,t.jsx)(r.code,{children:"Add Harvest Source"})," button"]}),"\n",(0,t.jsxs)(r.li,{children:["fill the form and click on ",(0,t.jsx)(r.code,{children:"save"})," button"]}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:"Here is an example of a configuration object (the one that must be entered in the configuration field):"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:'{\r\n "api_version": 1,\r\n "default_tags": [{"name": "geo"}, {"name": "namibia"}],\r\n "default_groups": ["science", "spend-data"],\r\n "default_extras": {"encoding":"utf8", "harvest_url": "{harvest_source_url}/dataset/{dataset_id}"},\r\n "override_extras": true,\r\n "organizations_filter_include": [],\r\n "organizations_filter_exclude": ["remote-organization"],\r\n "user":"harverster-user",\r\n "api_key":"<REMOTE_API_KEY>",\r\n "read_only": true,\r\n "remote_groups": "only_local",\r\n "remote_orgs": "create"\r\n}\n'})}),"\n",(0,t.jsxs)(r.p,{children:["read more ",(0,t.jsx)(r.a,{href:"https://github.com/ckan/ckanext-harvest?tab=readme-ov-file#the-ckan-harvester",children:"here"})]})]})}function d(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>i,a:()=>o});var t=n(7294);const s={},a=t.createContext(s);function o(e){const r=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(a.Provider,{value:r},e.children)}}}]);