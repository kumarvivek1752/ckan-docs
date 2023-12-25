"use strict";(self.webpackChunkckan_docs=self.webpackChunkckan_docs||[]).push([[364],{3024:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>o});var s=t(5893),r=t(1151);const i={sidebar_position:1},a="Install CKAN with Docker",c={id:"installation/install-with-docker",title:"Install CKAN with Docker",description:"In this section we will learn how to install CKAN with Docker.",source:"@site/docs/installation/install-with-docker.md",sourceDirName:"installation",slug:"/installation/install-with-docker",permalink:"/ckan-docs/installation/install-with-docker",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/installation/install-with-docker.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Installing CKAN",permalink:"/ckan-docs/category/installing-ckan"},next:{title:"Install CKAN with Package",permalink:"/ckan-docs/installation/install-with-package"}},l={},o=[{value:"What you&#39;ll need",id:"what-youll-need",level:3},{value:"Install CKAN with Docker",id:"install-ckan-with-docker-1",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"install-ckan-with-docker",children:"Install CKAN with Docker"}),"\n",(0,s.jsx)(n.p,{children:"In this section we will learn how to install CKAN with Docker."}),"\n",(0,s.jsx)(n.h3,{id:"what-youll-need",children:"What you'll need"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/ckan/ckan-docker.git",children:"CKAN Docker"})," clone master branch."]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"install-ckan-with-docker-1",children:"Install CKAN with Docker"}),"\n",(0,s.jsx)(n.p,{children:"step 1: Clone the CKAN Docker repository"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/ckan/ckan-docker.git\n"})}),"\n",(0,s.jsx)(n.p,{children:"step 2: Change directory to the CKAN Docker repository"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cd ckan-docker\n"})}),"\n",(0,s.jsxs)(n.p,{children:["step 3: Create a ",(0,s.jsx)(n.code,{children:".env"})," file"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cp .env.template .env\n"})}),"\n",(0,s.jsxs)(n.p,{children:["step 4: Edit the ",(0,s.jsx)(n.code,{children:".env"})," file"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"vim .env\n"})}),"\n",(0,s.jsxs)(n.p,{children:["step 5: modify the ",(0,s.jsx)(n.code,{children:".env"})," file according to your needs like:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",children:"# CKAN core\r\nCKAN_VERSION=2.10.0\r\nCKAN_SITE_ID=default\r\nCKAN_SITE_URL=https://localhost:8443\r\nCKAN___BEAKER__SESSION__SECRET=CHANGE_ME\r\nCKAN___API_TOKEN__JWT__ENCODE__SECRET=string:CHANGE_ME\r\nCKAN___API_TOKEN__JWT__DECODE__SECRET=string:CHANGE_ME\r\nCKAN_SYSADMIN_NAME=ckan_admin\r\nCKAN_SYSADMIN_PASSWORD=test1234\r\nCKAN_SYSADMIN_EMAIL=your_email@example.com\r\n\n"})}),"\n",(0,s.jsxs)(n.p,{children:["step 6: Modify the ",(0,s.jsx)(n.code,{children:"Dockerfile"})," in ckan folder"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dockerfile",children:'\r\nFROM ckan/ckan-base:2.10.3\r\n\r\n# Install any extensions needed by your CKAN instance\r\n# See Dockerfile.dev for more details and examples\r\n\r\n# Copy custom initialization scripts\r\nCOPY docker-entrypoint.d/* /docker-entrypoint.d/\r\n\r\n# Apply any patches needed to CKAN core or any of the built extensions (not the\r\n# runtime mounted ones)\r\nCOPY patches ${APP_DIR}/patches\r\n\r\nRUN for d in $APP_DIR/patches/*; do \\\r\n        if [ -d $d ]; then \\\r\n            for f in `ls $d/*.patch | sort -g`; do \\\r\n                cd $SRC_DIR/`basename "$d"` && echo "$0: Applying patch $f to $SRC_DIR/`basename $d`"; patch -p1 < "$f" ; \\\r\n            done ; \\\r\n        fi ; \\\r\n    done\r\n\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["here you can change the ",(0,s.jsx)(n.code,{children:"CKAN_VERSION"})," according to your needs."]}),"\n",(0,s.jsx)(n.li,{children:"you can also add any extensions needed by your CKAN instance."}),"\n",(0,s.jsx)(n.li,{children:"you can also add any patches needed to CKAN core or any of the built extensions (not the runtime mounted ones)."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"step 7: Build the CKAN image"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker-compose build\n"})}),"\n",(0,s.jsx)(n.p,{children:"step 8: Run the CKAN image"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker-compose up -d\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>a});var s=t(7294);const r={},i=s.createContext(r);function a(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);